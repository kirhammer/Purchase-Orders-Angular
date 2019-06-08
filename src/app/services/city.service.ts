import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../interfaces/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<City[]>{
    return this.http.get<City[]>('http://localhost:50666/api/city/all');
  }
}
