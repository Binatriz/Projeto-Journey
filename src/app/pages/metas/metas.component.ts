import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PerfilComponent } from '../../perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-metas',
  imports: [PerfilComponent, FormsModule, NgIf, NgFor],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.css'
})
export class MetasComponent {

  currentIndex: number = 0;

  metas = [
    { titulo: 'Meta 1', texto: '', itens: ['Exemplo 1', 'Exemplo 2'] },
    { titulo: 'Meta 2', texto: '', itens: ['A', 'B'] },
    { titulo: 'Meta 3', texto: '', itens: ['Item X', 'Item Y'] }
  ];

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

  salvarMeta(index: number) {
    console.log("Salvar meta:", this.metas[index]);
  }
}