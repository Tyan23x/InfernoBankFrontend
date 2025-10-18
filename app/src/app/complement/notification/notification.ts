import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
  @Input() message!: string;
  @Input() icon!: string;

  @Output() close = new EventEmitter<void>();

    onClose() {
    const element = document.querySelector('.error');
    element?.classList.add('closing');
    setTimeout(() => this.close.emit(), 300);
  }
}
