import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { SellerService } from '../services/seller.service';
import { CityService} from '../services/city.service';
import { RegionService } from '../services/region.service';

import { SellerComponent } from '../seller/seller.component';

import { Seller } from '../interfaces/Seller';
import { City } from '../interfaces/City';
import { Region } from '../interfaces/Region';

@Component({
  selector: 'app-new-seller',
  templateUrl: './new-seller.component.html',
  styleUrls: ['./new-seller.component.css']
})
export class NewSellerComponent implements OnInit {
  sellerForm: any;
  sellerComponent: SellerComponent;
  allCities: Observable<City[]>;
  allRegions: Observable<Region[]>;
  IdSeller: string;

  constructor(
    private formbuilder: FormBuilder,
    private sellerServices: SellerService,
    private cityService: CityService,
    private regionService: RegionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCities();
    this.getRegions();
    this.sellerForm = this.formbuilder.group({
      Id: [''],
      Name: ['',[Validators.required]],
      Address: ['',[Validators.required]],
      Phone: ['',[Validators.required, Validators.maxLength(10)]],
      CityId: ['',[Validators.required]],
      RegionId: ['',[Validators.required]],
      Location: ['',[Validators.required]]
    });

    this.route.paramMap.subscribe(
      (params: ParamMap)=> {
        this.IdSeller = params.get('id');
        this.getSeller();
      }
    );
  }

  onFormSubmit(){
    this.SaveSeller(this.sellerForm.value);
    this.router.navigate(['/seller/list/']);
  }

  SaveSeller(seller: Seller){
    if(this.IdSeller != null)
    {
      this.sellerServices.UpdateSeller(seller).subscribe(_ => this.sellerComponent.getUsers());
    }
    else
    {
      this.sellerServices.CreateSeller(seller).subscribe(_ => this.sellerComponent.getUsers());
    }
  }

  getSeller(){
    this.sellerServices.GetSeller(this.IdSeller).subscribe(
      seller=>{
        this.sellerForm.controls['Id'].setValue(seller.Id);
        this.sellerForm.controls['Name'].setValue(seller.Name);
        this.sellerForm.controls['Address'].setValue(seller.Address);
        this.sellerForm.controls['Phone'].setValue(seller.Phone);
        this.sellerForm.controls['CityId'].setValue(seller.CityId);
        this.sellerForm.controls['RegionId'].setValue(seller.RegionId);
      }
    );
  }
  getCities(){
    this.allCities = this.cityService.getAllCities();
  }
  getRegions(){
    this.allRegions = this.regionService.getAllRegions();
  }

}
