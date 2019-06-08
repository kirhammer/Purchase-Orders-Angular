import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../interfaces/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  GetSellers(): Observable<Seller[]>{
    return this.http.get<Seller[]>('http://localhost:50666/api/seller/all');
  }

  CreateSeller(seller: Seller): Observable<Seller>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<Seller>('http://localhost:50666/api/seller/add', seller, httpOptions);
  }

  GetSeller(id: string): Observable<Seller>{
    return this.http.get<Seller>('http://localhost:50666/api/seller/get?id=' + id);
  }

  UpdateSeller(seller: Seller): Observable<Seller>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put<Seller>("http://localhost:50666/api/seller/save", seller, httpOptions);
 }

  DeleteSeller(id: number): Observable<number>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.delete<number>("http://localhost:50666/api/seller/remove/" + id);
  }

}
