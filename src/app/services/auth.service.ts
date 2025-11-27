import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = 'https://parallelum.com.br/fipe/api/v1/carros';

  constructor(private http: HttpClient) {}

  /** Ford = id 22 */
  getModelosFord() {
    return this.http.get(`${this.base}/marcas/22/modelos`);
  }

  getAnosModelo(modeloId: number) {
    return this.http.get(`${this.base}/marcas/22/modelos/${modeloId}/anos`);
  }

  getInfoVeiculo(modeloId: number, anoCodigo: string) {
    return this.http.get(`${this.base}/marcas/22/modelos/${modeloId}/anos/${anoCodigo}`);
  }
}