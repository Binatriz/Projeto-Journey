import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface Item {
  texto: string;
  feito: boolean;
}

export interface Meta {
  titulo: string;
  texto: string;
  itens: Item[];
  editandoTitulo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  private apiUrl = 'http://localhost:3001';
  private baseUrl = 'http://localhost:3001/metas';

  metas: Meta[] = [];

  constructor(private http: HttpClient) {}

 carregarMetas() {
    this.http.get<{ metas: Meta[] }>(this.baseUrl).subscribe({
      next: (res) => {
        console.log("📥 Metas carregadas:", res.metas);
        this.metas = res.metas;
      },
      error: (err) => {
        console.error("❌ Erro ao carregar metas:", err);
      }
    });
  }
  // ======= SALVAR NO SERVIDOR =======
  salvarMetas() {
    return this.http.post(`${this.apiUrl}/metas`, { metas: this.metas })
      .subscribe(() => {
        console.log("Metas salvas na API");
      });
  }

  // ======= MANIPULAÇÃO LOCAL =======

  adicionarMeta(meta: Meta) {
    this.metas.push(meta);
    this.salvarMetas();
  }

  marcarItem(metaIndex: number, itemIndex: number) {
    const item = this.metas[metaIndex].itens[itemIndex];
    item.feito = !item.feito;
    this.salvarMetas();
  }

  editarTitulo(metaIndex: number, novoTitulo: string) {
    this.metas[metaIndex].titulo = novoTitulo;
    this.salvarMetas();
  }

  editarTexto(metaIndex: number, novoTexto: string) {
    this.metas[metaIndex].texto = novoTexto;
    this.salvarMetas();
  }

  // ======= PROGRESSOS =======
  getProgresso(index: number): number {
    const itens = this.metas[index].itens;
    if (!itens || itens.length === 0) return 0;

    const feitos = itens.filter(i => i.feito).length;
    return Math.round((feitos / itens.length) * 100);
  }

  getProgressoGeral(): number {
    if (this.metas.length === 0) return 0;

    const soma = this.metas
      .map((_, i) => this.getProgresso(i))
      .reduce((a, b) => a + b, 0);

    return Math.round(soma / this.metas.length);
  }
}