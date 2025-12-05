import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MetasService } from '../../services/metas.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  novoUsuario = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    aceitouLGPD: false
  };

  constructor(private metasService: MetasService, private router: Router) { }

  cadastrar() {

    // --- VALIDAÇÕES BÁSICAS ---

    if (!this.novoUsuario.nome || !this.novoUsuario.email || !this.novoUsuario.senha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (this.novoUsuario.senha !== this.novoUsuario.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!this.novoUsuario.aceitouLGPD) {
      alert("É necessário aceitar os Termos e Condições (LGPD).");
      return;
    }

    // --- CHAMADA PARA O BACK-END ---
    /*this.metasService.cadastrar(this.novoUsuario).subscribe({
      next: (response) => {
        alert("Cadastro realizado com sucesso!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao realizar o cadastro.");
      }
    });*/
  }

}