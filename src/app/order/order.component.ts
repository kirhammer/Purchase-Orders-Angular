import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';
import { OrderService } from '../services/order.service';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  allOrders: Observable<Order[]>;
  query: string;
  constructor(private orderService :OrderService,private router: Router) { }

  ngOnInit() {
    this.GetOrders();
  }

  GetOrders(){
    this.allOrders = this.orderService.getAllOrders();
  }

  loadOrderToEdit(id: number)
  {
    this.router.navigate(['/order/new/' + id]);
  }
  
  deleteOrder(id: number)
  {
    this.orderService.DeleteOrder(id).subscribe((data)=>{
      console.log("success");
    });
    this.router.navigate(['/order/list/']);
  }

}
