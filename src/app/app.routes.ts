import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ServidoresComponent } from './components/pages/servidores/servidores.component';
import { CrudUsersComponent } from './components/pages/crud-users/crud-users.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'servers', component: ServidoresComponent },
    { path: 'crud-user', component: CrudUsersComponent }
];
