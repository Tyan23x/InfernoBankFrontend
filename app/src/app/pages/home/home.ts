import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private session = inject(SessionService);
  private router = inject(Router);

  user: any;

  ngOnInit() {
    this.user = this.session.getUser();

    if (!this.user) {
      console.warn('No hay usuario logueado, redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Usuario logueado:', this.user);
  }

  logout() {
    this.session.clearUser(); 
    console.log('Sesión cerrada correctamente.');

    this.router.navigate(['/login']);
  }
}
