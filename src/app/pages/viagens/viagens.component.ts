import { Component, OnInit } from '@angular/core';
import { PerfilComponent } from "../../perfil/perfil.component";
import { CompanheiroFordComponent } from '../companheiro-ford/companheiro-ford.component';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface SugestaoViagem {
  titulo: string;
  descricao: string;
  destinosIndicados: string[];
  imagem: string;
}

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrl: './viagens.component.css',
  imports: [PerfilComponent, FormsModule, NgFor, NgIf]
})

export class ViagensComponent implements OnInit {

  modelos: any[] = [];
  selectedModelo: any = null;

  sugestao: SugestaoViagem | null = null;

  constructor(private api: AuthService) { }

  ngOnInit(): void {
    this.loadModelos();
  }

  /* ---- Carregar modelos Ford ---- */
  loadModelos() {
    this.api.getModelosFord().subscribe((data: any) => {
      this.modelos = data.modelos;
    });
  }

  /* ---- Quando escolhe o modelo ---- */
  onModeloChange() {
    this.sugestao = null;
    if (!this.selectedModelo) return;

    this.definirTipoESelecionarSugestao();
  }

  /* ---- Detectar tipo do carro baseado no nome ---- */
  definirTipoESelecionarSugestao() {
    const nome = this.selectedModelo.nome.toLowerCase();

    let tipo:
      | 'suv'
      | 'picape'
      | 'esportivo'
      | 'luxo'
      | 'van'
      | 'classico'
      | 'subcompacto'
      | 'eletrico'
      = 'classico';

    if (
      nome.includes('ka') ||
      nome.includes('ka+') ||
      nome.includes('fiesta 1.0')
    ) {
      tipo = 'subcompacto';
    }

    else if (
      nome.includes('ecosport') ||
      nome.includes('bronco') ||
      nome.includes('edge') ||
      nome.includes('explorer')
    ) {
      tipo = 'suv';
    }

    else if (
      nome.includes('ranger') ||
      nome.includes('f-100') ||
      nome.includes('f-150') ||
      nome.includes('f-250') ||
      nome.includes('f1000')
    ) {
      tipo = 'picape';
    }

    else if (
      nome.includes('mustang') ||
      nome.includes('xr3') ||
      nome.includes('rs') ||
      nome.includes('gt')
    ) {
      tipo = 'esportivo';
    }

    else if (
      nome.includes('fusion') ||
      nome.includes('platinum') ||
      nome.includes('titanium') ||
      nome.includes('limited') ||
      nome.includes('ghia')
    ) {
      tipo = 'luxo';
    }

    else if (
      nome.includes('courier van') ||
      nome.includes('transit') ||
      nome.includes('van') ||
      nome.includes('chassi')
    ) {
      tipo = 'van';
    }

    else if (
      nome.includes('corcel') ||
      nome.includes('belina') ||
      nome.includes('del rey') ||
      nome.includes('maverick') ||
      nome.includes('landau') ||
      nome.includes('galaxie') ||
      nome.includes('verona') ||
      nome.includes('escort') && parseInt(nome.replace(/\D/g, '')) < 2000
    ) {
      tipo = 'classico';
    }

    this.gerarSugestao(tipo);
  }

  /* ---- Criar sugestão baseada no tipo ---- */
  gerarSugestao(tipo: any) {
    const sugestoes: Record<string, SugestaoViagem> = {

      suv: {
        titulo: 'Aventuras e Trilhas Moderadas',
        descricao: `
SUVs oferecem o equilíbrio perfeito entre conforto, resistência e espaço. Veículos como EcoSport, Territory ou Bronco Sport proporcionam uma experiência de viagem versátil: são ótimos para quem gosta de natureza, trilhas leves, viagens com a família ou grupos de amigos.

Com boa altura do solo, porta-malas generoso e dirigibilidade confortável, esses carros permitem explorar estradas de terra, pequenas serras e destinos com paisagens naturais sem perder a segurança. As viagens costumam ser mais contemplativas, com paradas em mirantes, cachoeiras e vilarejos encantadores.
    `,
        destinosIndicados: [
          'Chapadas - Chapada dos Veadeiros, Diamantina, Guimarães',
          'Cachoeiras - acessíveis por estradas rurais',
          'Estradas rurais - paisagens verdes, fazendas e povoados'
        ],
        imagem: 'https://images.pexels.com/photos/1154617/pexels-photo-1154617.jpeg'
      },

      picape: {
        titulo: 'Viagens Off-road e Longas Distâncias',
        descricao: `
Picapes como a Ford Ranger ou F-150 são verdadeiras companheiras de estrada e aventura. Com grande capacidade de carga, tração robusta e desempenho poderoso, elas permitem explorar trajetos longos e desafiadores, incluindo regiões montanhosas, estradas sinuosas ou trilhas mais pesadas.

Esse tipo de viagem costuma ser mais imersiva e autêntica: atravessar cidades pequenas, conhecer comunidades rurais, acampar em locais isolados ou explorar serras e cânions.
    `,
        destinosIndicados: [
          'Interior - cidades históricas, rotas gastronômicas, povoados',
          'Áreas montanhosas - serras com visuais impressionantes',
          'Rotas off-road - dunas, trilhas pesadas, terrenos irregulares'
        ],
        imagem: 'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg'
      },

      esportivo: {
        titulo: 'Rotas Cênicas e Experiências Rápidas',
        descricao: `
Esportivos como o Ford Mustang foram feitos para estradas cinematográficas. Quem dirige um esportivo busca emoção, curvas bem desenhadas, estradas suaves e paisagens impressionantes.

As viagens são curtas, intensas e marcadas pela sensação de liberdade. São destinos ideais para casais, amigos ou para quem quer viver uma experiência premium, com fotos incríveis e cenários icônicos.
    `,
        destinosIndicados: [
          'Estrada Real - trechos históricos lindíssimos',
          'Serra do Rio do Rastro - uma das estradas mais bonitas do mundo',
          'Cidades turísticas - Gramado, Paraty, Campos do Jordão, Tiradentes'
        ],
        imagem: 'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg'
      },

      luxo: {
        titulo: 'Destinos Premium e Confortáveis',
        descricao: `
Carros de luxo como o Ford Fusion são sinônimo de conforto, sofisticação e viagens tranquilas. A experiência com esse tipo de veículo combina com longas distâncias em estradas bem asfaltadas, hotéis de alto padrão e destinos onde o foco é relaxar.

É o tipo de viagem ideal para quem busca conforto absoluto, gastronomia refinada, serviços exclusivos e paisagens urbanas vibrantes. Também é excelente para viagens de negócios que se misturam com lazer.
    `,
        destinosIndicados: [
          'Hotéis 5 estrelas - resorts, spas e hospedagens premium',
          'Viagens urbanas longas - capitais com boa infraestrutura',
          'Cidades históricas - Ouro Preto, Petrópolis, Salvador, São Luís'
        ],
        imagem: 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg'
      },

      van: {
        titulo: 'Viagens de Trabalho, Rotas Longas e Transporte de Equipamentos',
        descricao: `
Vans e utilitários como a Ford Transit são perfeitos para quem precisa levar muitas pessoas ou cargas. São ótimos para viagens longas, trabalho na estrada, transporte de equipe e roteiros em grupo.

Esse tipo de veículo oferece espaço interno amplo, excelente autonomia e muito conforto para viagens duradouras.
    `,
        destinosIndicados: [
          'Viagens de equipe — grupos e excursões curtas',
          'Rotas rodoviárias longas — cidades distantes e interestaduais',
          'Transporte profissional — eventos, filmagens, equipamentos'
        ],
        imagem: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg'
      },

      // CLÁSSICOS 
      classico: {
        titulo: 'Roteiros Culturais e Estradas Históricas',
        descricao: `
Modelos clássicos da Ford são perfeitos para quem aprecia história, estilo retrô e experiências mais tranquilas. Carros clássicos combinam com viagens cênicas, cidades históricas e eventos automotivos.

São ideais para dirigir sem pressa, apreciando a estrada e parando em pontos turísticos especiais.
    `,
        destinosIndicados: [
          'Estradas históricas — Estrada Real, Caminho Velho',
          'Cidades coloniais — Ouro Preto, Tiradentes, Paraty',
          'Encontros automotivos e passeios temáticos'
        ],
        imagem: 'https://images.pexels.com/photos/21014/pexels-photo.jpg'
      },

      // SUBCOMPACTO — (Ford Ka)
      subcompacto: {
        titulo: 'Economia Máxima e Agilidade nas Cidades',
        descricao: `
Subcompactos como o Ford Ka são ideais para quem busca economia, praticidade e facilidade para estacionar nas cidades. Perfeitos para trajetos urbanos e viagens rápidas para locais próximos.

São ótimos companheiros para quem quer viajar gastando pouco e com agilidade.
    `,
        destinosIndicados: [
          'Praias próximas',
          'Cidades vizinhas',
          'Passeios urbanos curtos'
        ],
        imagem: 'https://images.pexels.com/photos/12551059/pexels-photo-12551059.jpeg'
      }
    
    };

    this.sugestao = sugestoes[tipo];

    setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 50);
  setTimeout(() => {
  document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth' });
}, 50);
  }

}