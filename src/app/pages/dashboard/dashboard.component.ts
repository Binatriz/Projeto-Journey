import { Component, OnInit } from '@angular/core';
import { PerfilComponent } from "../../perfil/perfil.component";
import { MetasService } from '../../services/metas.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [PerfilComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent  implements OnInit {

  constructor(public metasService: MetasService) {}

  ngOnInit() {
    //
  }

  get metas() {
    return this.metasService.metas;
  }

  getProgresso(index: number) {
    return this.metasService.getProgresso(index);
  }

  get progressoGeral() {
    return this.metasService.getProgressoGeral();
  }

  get totalMetas() {
    return this.metasService.metas.length;
  }

  get metasConcluidas() {
    return this.metasService.metas.filter(
      (_, i) => this.metasService.getProgresso(i) === 100
    ).length;
  }
}