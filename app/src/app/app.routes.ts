import { Routes } from '@angular/router';
import { Register } from './pages/register/register'
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Update } from './pages/update/update';


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'update', component: Update },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
