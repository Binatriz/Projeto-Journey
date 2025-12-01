import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  nome = '';
  senha = '';
  hide = signal(true);

  constructor(private router: Router) {}

  login() {
    if (this.nome !== 'admin' || this.senha !== '123456') {
      alert('Nome ou senha inválidos');
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}