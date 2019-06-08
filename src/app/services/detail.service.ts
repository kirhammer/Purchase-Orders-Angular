import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Detail } from '../interfaces/Detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private httpclient :HttpClient) { }

  getAllDetails(Order: string): Observable<Detail[]>{
    return this.httpclient.get<Detail[]>('http://localhost:50666/api/detail/all?id='+ Order);
  }

  CreateDetail(detail: Detail): Observable<Detail>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.post<Detail>('http://localhost:50666/api/detail/add', detail, httpOptions);
  }

  GetDetail(id: string):Observable<Detail>{
    return this.httpclient.get<Detail>("http://localhost:50666/api/detail/get?id=" + id);
  }

  UpdateDetail(detail: Detail): Observable<Detail>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.put<Detail>("http://localhost:50666/api/detail/save", detail, httpOptions);
 }

 DeleteDetail(id: number): Observable<number>{
  const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
  return this.httpclient.delete<number>("http://localhost:50666/api/detail/remove/" +  id);
}
}
