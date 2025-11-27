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

  // MODELOS (lista da FIPE)
  modelos: any[] = [];
  selectedModelo: any = null;

  anos: any[] = [];
  selectedAno: string | null = null;

  // INFORMAÇÕES COMPLETAS DO VEÍCULO
  carInfo: any = null;

  constructor(private api: AuthService) {}

  ngOnInit(): void {
    this.loadModelos();
  }

  /*Carregar modelos da Ford */
  loadModelos() {
    this.api.getModelosFord().subscribe((data: any) => {
      this.modelos = data.modelos;
    });
  }

  /* Carregar anos */
  onModeloChange() {
    this.selectedAno = null;
    this.carInfo = null;

    this.api.getAnosModelo(this.selectedModelo.codigo)
      .subscribe((data: any) => {
        this.anos = data;
      });
  }

  /* informações do veículo */
  onAnoChange() {
    if (!this.selectedModelo || !this.selectedAno) return;

    this.api.getInfoVeiculo(this.selectedModelo.codigo, this.selectedAno)
      .subscribe((data: any) => {
        this.carInfo = data;
      });
  }
}