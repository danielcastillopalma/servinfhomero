import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ServidoresComponent } from './components/pages/servidores/servidores.component';
import { CrudUsersComponent } from './components/pages/crud-users/crud-users.component';
import { UserListComponent } from './components/pages/user-list/user-list.component';
import { CrudServersComponent } from './components/pages/crud-servers/crud-servers.component';
import { ServerListComponent } from './components/pages/server-list/server-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'servers', component: ServidoresComponent },
    { path: 'crud-user', component: CrudUsersComponent, canActivate: [authGuard] },
    { path: 'user-list', component: UserListComponent, canActivate: [authGuard] },
    { path: 'crud-server', component: CrudServersComponent, canActivate: [authGuard] },
    { path: 'list-server', component: ServerListComponent, canActivate: [authGuard] }
];
