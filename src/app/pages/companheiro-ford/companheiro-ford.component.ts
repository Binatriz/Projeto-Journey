import { Component, OnInit } from '@angular/core';
import { PerfilComponent } from "../../perfil/perfil.component";
import { Submodel } from '../../models/submodel';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-companheiro-ford',
  imports: [PerfilComponent, FormsModule, NgFor, NgIf],
  templateUrl: './companheiro-ford.component.html',
  styleUrl: './companheiro-ford.component.css'
})

export class CompanheiroFordComponent implements OnInit {
  modelos: any[] = [];

  // VEÍCULO 1
  selectedModelo1: any = null;
  selectedAno1: string | null = null;
  anos1: any[] = [];
  carInfo1: any = null;

  // VEÍCULO 2
  selectedModelo2: any = null;
  selectedAno2: string | null = null;
  anos2: any[] = [];
  carInfo2: any = null;

  constructor(private api: AuthService) { }

  ngOnInit(): void {
    this.loadModelos();
  }

  /* ------------ MODELOS ------------ */
  loadModelos() {
    this.api.getModelosFord().subscribe((data: any) => {
      this.modelos = data.modelos;
    });
  }

  showCompareModal = false;

  openCompareModal() {
    this.showCompareModal = true;
  }

  closeCompareModal() {
    this.showCompareModal = false;
  }

  /* ------------ QUANDO MUDA O MODELO (1 ou 2) ------------ */
  onModeloChange(box: number) {
    if (box === 1) {
      this.selectedAno1 = null;
      this.carInfo1 = null;

      this.api.getAnosModelo(this.selectedModelo1.codigo)
        .subscribe((data: any) => {
          this.anos1 = data;
        });

    } else {
      this.selectedAno2 = null;
      this.carInfo2 = null;

      this.api.getAnosModelo(this.selectedModelo2.codigo)
        .subscribe((data: any) => {
          this.anos2 = data;
        });
    }
  }

  /* ------------ QUANDO MUDA O ANO (1 ou 2) ------------ */
  onAnoChange(box: number) {
    if (box === 1) {
      if (!this.selectedModelo1 || !this.selectedAno1) return;

      this.api.getInfoVeiculo(this.selectedModelo1.codigo, this.selectedAno1)
        .subscribe((data: any) => {
          this.carInfo1 = data;
        });

    } else {
      if (!this.selectedModelo2 || !this.selectedAno2) return;

      this.api.getInfoVeiculo(this.selectedModelo2.codigo, this.selectedAno2)
        .subscribe((data: any) => {
          this.carInfo2 = data;
        });
    }
  }

}