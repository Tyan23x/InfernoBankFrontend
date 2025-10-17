import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Loading } from '../../complement/loading/loading'

@Component({
  selector: 'app-update',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, Loading],
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
  isLoading = false;

  updateForm = this.fb.group({
    name: [{ value: '', disabled: true }],
    last_name: [{ value: '', disabled: true  }],
    email: [{ value: '', disabled: true  }],
    document: [{ value: '', disabled: true  }],
    address: ['', Validators.required],
    phone: ['', Validators.required]
  });

  ngOnInit() {
  const savedUser = localStorage.getItem('user');

  if (!savedUser) {
    this.router.navigate(['/login']);
    return;
  }

  this.user = JSON.parse(savedUser);
  const document = this.user?.data?.document;

  if (!document) {
    this.errorMessage = 'No se encontró el identificador del usuario.';
    return;
  }

  this.isLoading = true;

  this.auth.updateGet(document).subscribe({
    next: (res: any) => {
      console.log('Datos obtenidos del perfil:', res);

      const data = res.data || res;

      this.updateForm.patchValue({
        name: data.name || '',
        last_name: data.lastName || '',
        email: data.email || '',
        document: data.document || '',
        address: data.address || '',
        phone: data.phone || ''
      });

      const updatedUser = { ...this.user, data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    },
    error: (err: any) => {
      console.error('Error al obtener perfil:', err);
      this.errorMessage = this.getErrorMessage(err);
    },
    complete: () => {
      this.isLoading = false;
    }
  });
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
    const document = this.user?.data?.document;

    if (!document) {
    this.errorMessage = 'No se encontró el identificador del usuario.';
    return;
  }

  this.isLoading = true;

    this.auth.update(address!, phone!, document).subscribe({
      next: res => {
        console.log('Actualizado con éxito:', res);
        this.successMessage = 'Perfil actualizado con éxito.';

        const updatedUser = { ...this.user, data: { ...this.user.data, address, phone } };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      },
      error: err => {
        console.error('Error al actualizar:', err);
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
    return 'Ocurrió un error inesperado.';
  }
}
