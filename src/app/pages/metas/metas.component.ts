import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PerfilComponent } from '../../perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-metas',
  imports: [PerfilComponent, FormsModule, NgFor],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.css'
})
export class MetasComponent {

  currentIndex: number = 0;

  // item temporário digitado
  novoItem: string = "";

  metas = [
    {
      titulo: 'Itens para não esquecer na viagem',
      texto: 'Checklist rápido para levar na mala:',
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
      itens: [
        { texto: 'Planejar horários de estudo/trabalho', feito: false },
        { texto: 'Separar prioridades da semana', feito: false }
      ]
    },
    {
      titulo: 'Estudos',
      texto: '',
      itens: [
        { texto: 'Estudar 1h por dia', feito: false },
        { texto: 'Organizar materiais da faculdade', feito: false },
        { texto: 'Assistir aulas atrasadas', feito: false }
      ]
    }
  ];

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

}