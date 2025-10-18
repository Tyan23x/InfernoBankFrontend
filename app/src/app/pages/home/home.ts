import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../services/session/session';
import { AuthService } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Target } from '../../complement/target/target'
import { Card } from '../../complement/card/card'
import { Loading } from '../../complement/loading/loading'


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Target, Card, Loading],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private session = inject(SessionService);
  private router = inject(Router);
  private auth = inject(AuthService);

  errorMessage = '';
  successMessage = '';
  user: any;
  isLoading = false;
  catalogData: any[] = [];

  ngOnInit() {
    this.user = this.session.getUser();

    if (!this.user) {
      console.warn('No hay usuario logueado, redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true

    this.auth.getCatalog().subscribe({
    next: (res: any) => {
      console.log('Datos obtenidos del catalogo:', res);
      this.catalogData = res.data || res;
      const getCatalog = { ...this.user, data: this.catalogData };
      localStorage.setItem('catalog', JSON.stringify(getCatalog));

    },
    error: (err: any) => {
      console.error('Error al obtener catalogo:', err);
      this.errorMessage = this.getErrorMessage(err);
    },
    complete: () => {
      this.isLoading = false;
    }
  });
  }

  logout() {
    this.session.clearUser();
    console.log('Sesión cerrada correctamente.');

    this.router.navigate(['/login']);
  }

  private getErrorMessage(err: any): string {
    if (err.status === 400) return 'Datos inválidos. Verifica la información.';
    if (err.status === 404) return 'No se encontró el recurso solicitado.';
    if (err.status === 403) return 'No tienes permiso para acceder a este recurso.';
    if (err.status === 409) return 'El usuario ya existe.';
    if (err.status === 500) return 'Error interno del servidor. Intenta más tarde.';
    return 'Ocurrió un error inesperado.';
  }
}
