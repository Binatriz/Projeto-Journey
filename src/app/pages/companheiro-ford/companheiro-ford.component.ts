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

  submodels: Submodel[] = [];

  // opções para os selects
  idOptions: (number)[] = [];
  oemOptions: (number)[] = [];
  yearOptions: number[] = [];
  makeOptions: string[] = [];
  modelOptions: string[] = [];
  submodelOptions: string[] = [];

  // valores selecionados (two-way bind no template)
  selectedId: number | null = null;
  selectedOem: number | null = null;
  selectedYear: number | null = null;
  selectedMake: string | null = null;
  selectedModel: string | null = null;
  selectedSubmodel: string | null = null;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // busca lista completa
    this.auth.getVehicles('Ford').subscribe({
      next: (list) => {
        this.submodels = list || [];

        // popular opções únicas
        this.idOptions = Array.from(new Set(this.submodels.map(s => s.id))).filter(Boolean) as number[];
        this.oemOptions = Array.from(new Set(this.submodels.map(s => (s as any).oem_make_model_id))).filter(Boolean) as number[];
        this.yearOptions = Array.from(new Set(this.submodels.map(s => s.year))).filter(Boolean) as number[];
        this.makeOptions = Array.from(new Set(this.submodels.map(s => s.make))).filter(Boolean) as string[];
        this.modelOptions = Array.from(new Set(this.submodels.map(s => s.model))).filter(Boolean) as string[];
        this.submodelOptions = Array.from(new Set(this.submodels.map(s => s.submodel))).filter(Boolean) as string[];

        // verifica query param id e seleciona o item correspondente
        const idParam = this.route.snapshot.queryParamMap.get('id');
        if (idParam) {
          const found = this.submodels.find(s => String(s.id) === idParam);
          if (found) {
            this.selectedId = found.id ?? null;
            this.selectedOem = (found as any).oem_make_model_id ?? null;
            this.selectedYear = found.year ?? null;
            this.selectedMake = found.make ?? null;
            this.selectedModel = found.model ?? null;
            this.selectedSubmodel = found.submodel ?? null;
          }
        }
      },
      error: (err) => console.error('Erro ao carregar submodels', err)
    });
  }
}