import { Component } from '@angular/core';
import { PerfilComponent } from "../../perfil/perfil.component";

@Component({
  selector: 'app-dashboard',
  imports: [PerfilComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
