import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './update.html',
  styleUrl: './update.scss'
})
export class Update implements OnInit {
  private fb = inject(FormBuilder);
  private auth = auth();
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';
  user: any;

  updateForm = this.fb.group({
    name: [{ value: '' }],
    last_name: [{ value: '' }],
    email: [{ value: '' }],
    document: [{ value: '' }],
    address: ['', Validators.required],
    phone: ['', Validators.required]
  });

  ngOnInit() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);

      this.updateForm.patchValue({
        name: this.user.data?.name || '',
        last_name: this.user.data?.last_name || '',
        email: this.user.data?.email || '',
        document: this.user.data?.document || '',
        address: this.user.data?.address || '',
        phone: this.user.data?.phone || ''
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  reloadPage() {
    window.location.reload();
  }

  onUpdate() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.updateForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { address, phone } = this.updateForm.getRawValue();

    this.auth.update(address!, phone!).subscribe({
      next: res => {
        console.log('Actualizado con éxito:', res);
        this.successMessage = 'Perfil actualizado con éxito.';

        const updatedUser = { ...this.user, data: { ...this.user.data, address, phone } };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      },
      error: err => {
        console.error('Error al actualizar:', err);
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
    return 'Ocurrió un error inesperado.';
  }
}
