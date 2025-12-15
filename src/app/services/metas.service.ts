import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

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

const key = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  private apiUrl = 'http://localhost:3001';
  private baseUrl = 'http://localhost:3001/metas';

  // ⭐ EXEMPLO PADRÃO INICIAL (APENAS UMA VEZ)
  metas: Meta[] = [
    {
      titulo: 'Itens para não esquecer na viagem',
      texto: 'Checklist rápido para levar na mala:',
      editandoTitulo: false,
      itens: [
        { texto: 'Documentos pessoais', feito: false },
        { texto: 'Cartões e dinheiro', feito: false },
        { texto: 'Carregador e powerbank', feito: false },
        { texto: 'Roupas essenciais', feito: false },
        { texto: 'Itens de higiene', feito: false },
        { texto: 'Remédios necessários', feito: false }
      ]
    },
    {
      titulo: 'Organizar rotina semanal',
      texto: 'Tarefas para manter a semana produtiva:',
      editandoTitulo: false,
      itens: [
        { texto: 'Planejar horários de estudo/trabalho', feito: false },
        { texto: 'Separar prioridades da semana', feito: false }
      ]
    },
    {
      titulo: 'Estudos',
      texto: '',
      editandoTitulo: false,
      itens: [
        { texto: 'Estudar 1h por dia', feito: false },
        { texto: 'Organizar materiais da faculdade', feito: false },
        { texto: 'Assistir aulas atrasadas', feito: false }
      ]
    }
  ];

  constructor(private http: HttpClient, private router: Router) { }

  // ===== LOGIN =====
  login(usuario: Pick<Usuario, 'nome' | 'senha'>): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, usuario).pipe(
      tap(response => {
        sessionStorage.setItem(key, JSON.stringify(response));
      })
    );
  }

  cadastrar(usuario: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  logout(): void {
    sessionStorage.removeItem(key);
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return !!sessionStorage.getItem(key);
  }

  // ===== CARREGA SE TIVER DADOS NO BACKEND =====
  carregarMetas() {
    this.http.get<{ metas: Meta[] }>(this.baseUrl).subscribe({
      next: (res) => {
        if (res.metas && res.metas.length > 0) {
          console.log("📥 Dados reais carregados do servidor");
          this.metas = res.metas; // só substitui se houver algo salvo
        } else {
          console.log("ℹ Nenhuma meta salva — usando o exemplo padrão");
        }
      },
      error: (err) => {
        console.log("⚠ API offline — usando metas padrão locais");
      }
    });
  }

  // ===== SALVAR NO SERVIDOR =====
  salvarMetas() {
    return this.http.post(this.baseUrl, { metas: this.metas });
  }

  // ===== MANIPULAÇÃO LOCAL ======
  adicionarMeta(meta: Meta) {
    this.metas.push(meta);
    this.salvarMetas().subscribe();
  }

  marcarItem(metaIndex: number, itemIndex: number) {
    const item = this.metas[metaIndex].itens[itemIndex];
    item.feito = !item.feito;
    this.salvarMetas().subscribe();
  }

  editarTitulo(metaIndex: number, novoTitulo: string) {
    this.metas[metaIndex].titulo = novoTitulo;
    this.salvarMetas().subscribe();
  }

  editarTexto(metaIndex: number, novoTexto: string) {
    this.metas[metaIndex].texto = novoTexto;
    this.salvarMetas().subscribe();
  }

  // ===== PROGRESSO ======
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