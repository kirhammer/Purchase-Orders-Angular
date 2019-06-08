import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpclient :HttpClient) { }

  getAllOrders(): Observable<Order[]>{
    return this.httpclient.get<Order[]>('http://localhost:50666/api/order/all');
  }

  CreateOrder(order: Order): Observable<Order>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.post<Order>('http://localhost:50666/api/order/add', order, httpOptions);
  }

  GetOrder(id: string):Observable<Order>{
    return this.httpclient.get<Order>("http://localhost:50666/api/order/get?id=" + id);
  }
  
  UpdateOrder(order: Order): Observable<Order>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.put<Order>("http://localhost:50666/api/order/save", order, httpOptions);
 }

 DeleteOrder(id: number): Observable<number>{
  const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
  return this.httpclient.delete<number>("http://localhost:50666/api/order/remove/" + id);
}
}
