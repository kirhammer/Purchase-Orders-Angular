import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Part } from '../interfaces/Part';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private httpclient :HttpClient) { }

  getAllParts(): Observable<Part[]>{
    return this.httpclient.get<Part[]>('http://localhost:50666/api/part/all');
  }

  CreatePart(part: Part): Observable<Part>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.post<Part>('http://localhost:50666/api/part/add', part, httpOptions);
  }

  GetPart(id: string):Observable<Part>{
    return this.httpclient.get<Part>("http://localhost:50666/api/part/get?id=" + id);
  }

  UpdatePart(part: Part): Observable<Part>{
    const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpclient.put<Part>("http://localhost:50666/api/part/save", part, httpOptions);
 }

 DeletePart(id: number): Observable<number>{
  const httpOptions = {headers:  new HttpHeaders({'Content-Type': 'application/json'})};
  return this.httpclient.delete<number>("http://localhost:50666/api/part/remove/" + id);
}
}
