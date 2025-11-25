import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  // Dados do usuário (virão do backend depois)
  userName: string = "Beatriz";
  carLevel: string = "Ford Focus";

  menuOnClick(): void {
    const menuBar = document.getElementById("menu-bar");
    const nav = document.getElementById("nav");
    const menuBg = document.getElementById("menu-bg");

    if (menuBar && nav && menuBg) {
      menuBar.classList.toggle("change");
      nav.classList.toggle("change");
      menuBg.classList.toggle("change-bg");
    } else {
      console.warn("Um ou mais elementos não foram encontrados no DOM.");
    }
  }

}