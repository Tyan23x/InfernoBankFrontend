import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor() {}

  ngOnInit() {
    console.log('Register page loaded');
  }
}
