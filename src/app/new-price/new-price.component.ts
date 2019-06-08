import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { PartService } from '../services/part.service';
import { SellerService } from '../services/seller.service';
import { PriceService } from '../services/price.service';


import { Seller } from '../interfaces/Seller';
import { Part } from '../interfaces/Part';
import { Price } from '../interfaces/Price';

import { PriceComponent } from '../price/price.component';

@Component({
  selector: 'app-new-price',
  templateUrl: './new-price.component.html',
  styleUrls: ['./new-price.component.css']
})
export class NewPriceComponent implements OnInit {
  priceForm: any;
  priceComponent: PriceComponent;
  allSellers: Observable<Seller[]>;
  allParts: Observable<Part[]>;
  IdPrice: string;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private partService :PartService,
    private sellerService :SellerService,
    private priceService :PriceService
  ) { }

  ngOnInit() {
    this.GetSellers();
    this.GetParts();
    this.priceForm = this.formbuilder.group({
      Id: [''],
      Part: ['',[Validators.required]],
      Seller: ['',[Validators.required]],
      Price: ['',[Validators.required]]
    });

    this.route.paramMap.subscribe(
      (params: ParamMap)=> {
        this.IdPrice = params.get('id');
        this.getPrice();
      }
    );
  }

  getPrice(){
    this.priceService.GetPrice(this.IdPrice).subscribe(
      price =>{
        this.priceForm.controls['Id'].setValue(price.Id);
        this.priceForm.controls['Part'].setValue(price.Part);
        this.priceForm.controls['Seller'].setValue(price.Seller);
        this.priceForm.controls['Price'].setValue(price.Price);
      }
    );
  }

  onFormSubmit(){
    this.SavePrice(this.priceForm.value);
    this.router.navigate(['/price/list/']);
  }

  SavePrice(price: Price){
    if(this.IdPrice != null)
    {
      this.priceService.UpdatePrice(price).subscribe(_ => this.priceComponent.getPrices());
    }
    else
    {
      this.priceService.UpdatePrice(price).subscribe(_ => this.priceComponent.getPrices());
    }
  }
  
  GetParts(){
    this.allParts = this.partService.getAllParts();
  }

  GetSellers(){
    this.allSellers = this.sellerService.GetSellers();
  }

}
