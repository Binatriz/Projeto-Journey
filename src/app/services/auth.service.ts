import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Submodel } from '../models/submodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private http: HttpClient) {}

  // Buscar modelos por marca
  getModelsByMake(make: string): Observable<any> {
    return this.http.get(`${this.base}/getmodelsformake/${make}?format=json`);
  }
}