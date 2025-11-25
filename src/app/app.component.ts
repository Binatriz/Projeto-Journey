import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from "./perfil/perfil.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, PerfilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projeto_Journey';
}
