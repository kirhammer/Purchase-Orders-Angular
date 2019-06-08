import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Seller } from '../interfaces/Seller';
import { Part } from '../interfaces/Part';
import { Price } from '../interfaces/Price';

import { PartService} from '../services/part.service';
import { SellerService} from '../services/seller.service';
import { PriceService } from '../services/price.service';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  allPrices: Observable<Price[]>;
  query: string;
  constructor(private priceService :PriceService,private router: Router) { }

  ngOnInit() {
    this.allPrices = this.priceService.getAllPrices();
  }

  getPrices(){
    this.allPrices = this.priceService.getAllPrices();
  }

  loadPriceToEdit(id: string){
    this.router.navigate(['/price/new/' + id]);
  }

  deletePrice(id: string){
    this.priceService.DeletePrice(id).subscribe((data)=>{
      console.log("success");
    });
    this.router.navigate(['/price/list/']);
  }


}
