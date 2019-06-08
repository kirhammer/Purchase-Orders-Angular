import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Price } from '../interfaces/Price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private httpclient :HttpClient) { }

  getAllPrices(): Observable<Price[]>{
    return this.httpclient.get<Price[]>('http://localhost:50666/api/price/all');
  }

  CreatePrice(part: Price): Observable<Price>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.post<Price>('http://localhost:50666/api/price/add', part, httpOptions);
  }

  GetPrice(id: string):Observable<Price>{
    return this.httpclient.get<Price>("http://localhost:50666/api/price/get?id=" + id);
  }

  GetPrices(id: number)
  {
    return this.httpclient.get<Price[]>("http://localhost:50666/api/price/filter?id=" + id);
  }

  UpdatePrice(price: Price): Observable<Price>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.put<Price>("http://localhost:50666/api/price/save", price, httpOptions);
 }

 DeletePrice(id: string): Observable<number>{
  const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
  return this.httpclient.delete<number>("http://localhost:50666/api/price/remove/" + id);
}
}
