import { Component, OnInit } from '@angular/core';
import { PerfilComponent } from "../../perfil/perfil.component";
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule} from '@angular/common';
import { Submodel } from '../../models/submodel';

@Component({
  selector: 'app-dashboard',
  imports: [PerfilComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  carrosFord: Submodel[] = [];
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getVehicles().subscribe((data: Submodel) => {
      console.log(data);
      this.carrosFord = data as unknown as Submodel[];
    });
  }
}
