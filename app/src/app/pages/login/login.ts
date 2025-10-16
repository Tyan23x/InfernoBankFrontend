import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from '../../services/session/session';

@Component({ 
  selector: 'app-login', 
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss' 
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = auth();
  private router = inject(Router);
  private session = inject(SessionService);

  errorMessage = '';
  successMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  reloadPage() { window.location.reload(); }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: res => {
        console.log('Login exitoso:', res);
        this.session.setUser(res); // 👈 Guarda el usuario en el servicio
        this.successMessage = 'Login exitoso. Bienvenido de nuevo.';

        setTimeout(() => this.router.navigate(['/home']), 1000);
      },
      error: err => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = this.getErrorMessage(err);
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
