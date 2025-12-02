import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompanheiroFordComponent } from './pages/companheiro-ford/companheiro-ford.component';
import { MetasComponent } from './pages/metas/metas.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'dashboard'},
    {path:'dashboard', component: DashboardComponent},
    {path: 'companheiro-ford', component: CompanheiroFordComponent},
    {path: 'metas', component: MetasComponent},
    {path: 'login', component: LoginComponent}
];
