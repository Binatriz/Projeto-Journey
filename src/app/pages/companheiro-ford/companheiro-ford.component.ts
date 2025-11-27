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
export class CompanheiroFordComponent implements OnInit  {

  selectedMake = 'Ford';

  // LISTA DE SUBMODELOS
  submodels: any[] = [];

  // SUBMODELO ESCOLHIDO
  selectedSubmodel: any = null;

  constructor(private carApi: AuthService) {}

  ngOnInit(): void {
    this.loadSubmodels();
  }

  // CARREGA SUBMODELS DA API (FORD)
  loadSubmodels() {
    this.carApi.getModelsByMake('Ford').subscribe((data: any) => {
      this.submodels = data.Results;
    });
  }

  // QUANDO O SUBMODEL É SELECIONADO
  onSelect() {
    console.log("Selecionado:", this.selectedSubmodel);
  }
}