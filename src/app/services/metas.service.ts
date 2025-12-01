import { Injectable } from '@angular/core';

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
      texto: 'Tarefas importantes para manter a semana produtiva:',
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

  // progresso de uma meta
  getProgresso(index: number): number {
    const itens = this.metas[index].itens;
    if (itens.length === 0) return 0;

    const feitos = itens.filter(i => i.feito).length;
    return Math.round((feitos / itens.length) * 100);
  }

  // progresso TOTAL (para o dashboard)
  getProgressoGeral(): number {
    if (this.metas.length === 0) return 0;

    const soma = this.metas
      .map((_, i) => this.getProgresso(i))
      .reduce((a, b) => a + b, 0);

    return Math.round(soma / this.metas.length);
  }

}
