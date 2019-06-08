import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { PriceService } from '../services/price.service';
import { SellerService } from '../services/seller.service';
import { DetailService } from '../services/detail.service';
import { OrderService } from '../services/order.service';

import { OrderComponent } from '../order/order.component';

import { Order } from '../interfaces/Order';
import { Detail } from '../interfaces/Detail';
import { Price } from '../interfaces/Price';
import { Seller } from '../interfaces/Seller';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  orderForm: any;
  detailForm: any;
  orderComponent: OrderComponent;
  allSellers: Observable<Seller[]>;
  allPrices: Observable<Price[]>;
  allDetails: Observable<Detail[]>;
  detail: Detail;
  IdOrder :string;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private priceService :PriceService,
    private sellerService :SellerService,
    private detailService :DetailService,
    private orderService :OrderService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.GetSellers();
    this.GetPrices();
    this.orderForm = this.formbuilder.group({
      Id: [''],
      Date: ['',[Validators.required]],
      BillNumber: ['',[Validators.required]],
      Seller: ['',[Validators.required]],
    });

    this.detailForm = this.formbuilder.group({
      Part: ['',[Validators.required]],
      Order: ['',[Validators.required]],
      UnitPrice: ['',[Validators.required]],
      Quantity: ['',[Validators.required]]
    });
    this.route.paramMap.subscribe(
      (params: ParamMap)=> {
        this.IdOrder = params.get('id');
        this.getOrder();
      }
    );
    this.GetDetails();

  }

  getOrder(){
    this.orderService.GetOrder(this.IdOrder).subscribe(
      order=>{
        this.orderForm.controls['Id'].setValue(order.Id);
        this.orderForm.controls['Date'].setValue(this.datePipe.transform(order.Date, 'yyyy-MM-dd'));
        this.orderForm.controls['BillNumber'].setValue(order.BillNumber);
        this.orderForm.controls['Seller'].setValue(order.Seller);

      }
    );
  }

  onFormSubmit(){
    this.CreateOrder(this.orderForm.value);
    this.router.navigate(['/order/list/']);
  }

  onDetailSubmit(order: number, part: number, unitprice: number, quantity: number){
    this.detail = {
      Id: null,
      Part: part,
      PartName: null,
      Order: order,
      UnitPrice: unitprice,
      Quantity: quantity,
    };    
    console.log(this.detail)
    this.CreateDetail(this.detail);
  }
  onDetailDelete(item: number){
    console.log(item);
    this.detailService.DeleteDetail(item).subscribe((data)=>{
      console.log("success");
    });
  }

  CreateDetail(detail: Detail){
    this.detailService.CreateDetail(detail).subscribe(_ => this.orderComponent.GetOrders());
  }

  CreateOrder(order: Order){
    this.orderService.CreateOrder(order).subscribe(_ => this.orderComponent.GetOrders());
  }

  GetPrices(){
    this.allPrices = this.priceService.getAllPrices();
  }

  GetDetails(){
    this.allDetails = this.detailService.getAllDetails(this.IdOrder);
  }

  GetSellers(){
    this.allSellers = this.sellerService.GetSellers();
  }

  filterPrices(filter :any)
  {
        this.allPrices = this.priceService.GetPrices(filter);
  }

}
