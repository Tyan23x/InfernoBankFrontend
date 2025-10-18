import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() titulo!: string;
  @Input() cuerpo!: string;
  @Input() complemento!: string;
  @Input() id!: number;
}
