import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session/session';
import { Router, RouterModule } from '@angular/router';
import { auth } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-target',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './target.html',
  styleUrl: './target.scss'
})
export class Target implements OnInit{

  private session = inject(SessionService);
  private router = inject(Router);
  private auth = inject(auth);

  user: any;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  
  ngOnInit() {
    this.user = this.session.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
    }

    this.auth.getCard(this.user.data.cardid).subscribe({
      next: (res: any) => {
        console.log('card exitoso:', res);
        this.successMessage = 'Login exitoso. Bienvenido de nuevo.';

        setTimeout(() => this.router.navigate(['/home']), 500);
      },
      error: (err: any) => {
        console.error('Error al obtener la tarjeta:', err);
        this.errorMessage = this.getErrorMessage(err);
      },
      complete: () => {
      this.isLoading = false;
    }
    });

  }

  private getErrorMessage(err: any): string {
    if (err.status === 400) return 'Datos inválidos. Verifica la información.';
    if (err.status === 404) return 'No se encontró el recurso solicitado.';
    if (err.status === 403) return 'No tienes permiso para acceder a este recurso.';
    if (err.status === 409) return 'El usuario ya existe.';
    if (err.status === 500) return 'Error interno del servidor. Intenta más tarde.';
    return 'USER_OR_PASSWORD_INCORRECT.';
  }

}
