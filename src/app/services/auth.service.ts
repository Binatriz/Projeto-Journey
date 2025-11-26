import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable } from 'rxjs';
import { Submodel } from '../models/submodel';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://carapi.app/api/submodels/v2';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Submodel>{
    const modeloCarro = this.http.get<Submodel> (`${this.baseUrl}`)
    return modeloCarro;
  }
  
}