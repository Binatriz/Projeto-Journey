import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MetasService } from '../../services/metas.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = {
    nome:'',
    senha:''
  }

  constructor(private metasService: MetasService, private router: Router) { }

  login(){
    this.metasService.login(this.usuario).subscribe({
      next:(response)=>{
        console.log("Entrou");
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>{
        alert("Usuario ou Senha incorretos")
      }
    })
  }
}