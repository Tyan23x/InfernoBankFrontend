import { Component, OnInit, inject } from '@angular/core';
import { SessionService } from '../../services/session/session';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-target',
  imports: [],
  templateUrl: './target.html',
  styleUrl: './target.scss'
})
export class Target implements OnInit{

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

}
