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

    
  }

}
