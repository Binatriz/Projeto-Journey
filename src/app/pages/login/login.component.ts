import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = {
    nome: '',
    senha: ''
  }

  constructor(private metasService: MetasService, private router: Router) { }

  login() {

    const usuarioLogin = {
      nome: this.usuario.nome, // pode ser nome OU email
      senha: this.usuario.senha
    };

    this.metasService.login(usuarioLogin).subscribe({
      next: (response) => {
        console.log("Entrou");

        // garante sessão local (caso o backend não faça)
        sessionStorage.setItem('auth-user', JSON.stringify(response));

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert("Usuário (nome ou e-mail) ou senha incorretos");
      }
    });

  }
}