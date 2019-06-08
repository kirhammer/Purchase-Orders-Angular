import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../interfaces/Seller';
import { SellerService} from '../services/seller.service';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  allSellers: Observable<Seller[]>;
  query: string;
  result: Observable<number>;
  constructor(private sellerService: SellerService,private router: Router) { }

  ngOnInit() {
    this.allSellers = this.sellerService.GetSellers();
  }

  getUsers(){
    this.allSellers = this.sellerService.GetSellers();
  }

  loadSellerToEdit(id: number)
  {
    this.router.navigate(['/seller/new/' + id]);
  }
  
  loadSellerToDelete(id: number)
  {
   this.sellerService.DeleteSeller(id).subscribe((data)=>{
    console.log("success");
    this.router.navigate(['/seller/list/']);
  });
  }
}
