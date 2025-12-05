import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompanheiroFordComponent } from './pages/companheiro-ford/companheiro-ford.component';
import { MetasComponent } from './pages/metas/metas.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ViagensComponent } from './pages/viagens/viagens.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
    
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},

    {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'companheiro-ford', component: CompanheiroFordComponent, canActivate: [authGuard]},
    {path: 'metas', component: MetasComponent, canActivate: [authGuard]},
    {path: 'viagens', component:ViagensComponent, canActivate: [authGuard]},

    {path: "", pathMatch: 'full', redirectTo: 'login'}
];
