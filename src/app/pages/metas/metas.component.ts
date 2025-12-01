import { Component, ElementRef, ViewChild } from '@angular/core';
import { PerfilComponent } from '../../perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

interface Item {
  texto: string;
  feito: boolean;
}

interface Meta {
  titulo: string;
  texto: string;
  itens: Item[];
  editandoTitulo?: boolean;
}

@Component({
  selector: 'app-metas',
  imports: [PerfilComponent, FormsModule, NgFor, NgIf],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.css'
})

export class MetasComponent {

  currentIndex: number = 0;

  // item temporário digitado
  novoItem: string = "";

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

  editarTitulo(index: number) {
    this.metas[index].editandoTitulo = true;
  }

  salvarTitulo(index: number) {
    this.metas[index].editandoTitulo = false;
  }

  // 👉 Carousel
  next() {
    if (this.currentIndex < this.metas.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // 👉 Salvar texto da meta (já existente)
  salvarMeta(index: number) {
    console.log("Salvar meta:", this.metas[index]);
  }

  // 👉 Adicionar item ao checklist
  adicionarItem() {
    const txt = this.novoItem.trim();
    if (!txt) return; // evita item vazio

    this.metas[this.currentIndex].itens.push({
      texto: txt,
      feito: false
    });

    this.novoItem = ""; // limpa input
  }

  addMeta() {
    if (this.metas.length >= 10) {
    alert("Você atingiu o limite máximo de 10 metas.");
    return;
  }
  
    const nova: Meta = {
      titulo: `Nova Meta ${this.metas.length + 1}`,
      texto: '',
      itens: []
    };
    this.metas.push(nova);
    this.currentIndex = this.metas.length - 1;
  }

  getProgresso(index: number): number {
    const itens = this.metas[index].itens;
    if (!itens || itens.length === 0) return 0;

    const feitos = itens.filter(i => i.feito).length;
    return Math.round((feitos / itens.length) * 100);
  }

}