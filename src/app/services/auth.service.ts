import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Submodel } from '../models/submodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://carapi.app/api/submodels/v2';
  private authUrl = 'https://carapi.app/api/auth/login';

  // fallback/token fixo (opcional). Recomenda-se usar login() para obter JWT real.
  private readonly FALLBACK_TOKEN = 'f81af3f9-955a-418d-acaa-890ae6483fda';

  // token atual (pode vir do login ou do localStorage)
  private jwtToken: string | null = null;

  constructor(private http: HttpClient) {
    // tenta recuperar token em cache
    this.jwtToken = localStorage.getItem('carapi_jwt');
  }

  // salva token em memória e localStorage
  private setToken(token: string) {
    this.jwtToken = token;
    localStorage.setItem('carapi_jwt', token);
  }

  // Faz POST /api/auth/login com api_token + api_secret e guarda o JWT retornado (responseType text)
  login(api_token: string, api_secret: string): Observable<string> {
    return this.http.post(this.authUrl, { api_token, api_secret }, { responseType: 'text' })
      .pipe(tap(token => this.setToken(token)));
  }

  // Busca submodels; inclui Authorization: Bearer <token> se existir, caso contrário usa FALLBACK_TOKEN
  getVehicles(make: string = 'Ford'): Observable<Submodel[]> {
    const params = new HttpParams().set('make', make);
    let headers = new HttpHeaders({ 'Accept': 'application/json' });
    const token = this.jwtToken ?? this.FALLBACK_TOKEN;
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Submodel[]>(this.baseUrl, { params, headers });
  }
  
}