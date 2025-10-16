import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = auth();

  errorMessage = '';
  successMessage = '';

  registerForm = this.fb.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    document: ['', Validators.required],
    password: ['', Validators.required]
  });

  reloadPage() {
    window.location.reload();
  }

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { name, last_name, email, document, password } = this.registerForm.value;

    this.auth.register(name!, last_name!, email!, document!, password!).subscribe({
      next: res => {
        console.log('Registro exitoso:', res);
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.registerForm.reset();
      },
      error: err => {
        console.error('Error al registrar:', err);
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
    return 'An error occurred while registering. Please try again.';
  }
}
