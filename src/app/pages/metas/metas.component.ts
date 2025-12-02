import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerfilComponent } from '../../perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MetasService } from '../../services/metas.service';

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

export class MetasComponent implements OnInit {

  currentIndex: number = 0;
  novoItem: string = "";

  constructor(public metasService: MetasService) { }

  ngOnInit() {
    //
  }
  // 👉 Acesso direto às metas do service
  get metas() {
    return this.metasService.metas;
  }

  // 👉 Editar título
  editarTitulo(index: number) {
    this.metas[index].editandoTitulo = true;
  }

  salvarTitulo(index: number) {
    this.metas[index].editandoTitulo = false;
    this.metasService.salvarMetas();  // salva na API
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

  // 👉 Salvar meta existente
  salvarMeta(index: number) {
    console.log("Meta salva:", this.metas[index]);
    this.metasService.salvarMetas();
  }

  // 👉 Adicionar item
  adicionarItem() {
    const txt = this.novoItem.trim();
    if (!txt) return;

    this.metas[this.currentIndex].itens.push({
      texto: txt,
      feito: false
    });

    this.novoItem = "";
    this.metasService.salvarMetas();
  }

  // 👉 Alternar tarefa concluída
  toggleItem(metaIndex: number, itemIndex: number) {
    const item = this.metas[metaIndex].itens[itemIndex];
    item.feito = !item.feito;

    this.metasService.salvarMetas();
  }

  // 👉 Adicionar nova meta
  addMeta() {
    if (this.metas.length >= 100) {
      alert("Você atingiu o limite máximo de 100 metas.");
      return;
    }

    const nova: Meta = {
      titulo: `Nova Meta ${this.metas.length + 1}`,
      texto: '',
      editandoTitulo: false,
      itens: []
    };

    this.metas.push(nova);
    this.currentIndex = this.metas.length - 1;

    this.metasService.salvarMetas();
  }

  // 👉 Progresso individual
  getProgresso(index: number): number {
    return this.metasService.getProgresso(index);
  }
}