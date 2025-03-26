import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-data',
  imports: [CommonModule],
  templateUrl: './profil-data.component.html',
  styleUrl: './profil-data.component.scss'
})
export class ProfilDataComponent {

  @Output() carFormClicked = new EventEmitter<void>();
  @Output() activeFactureClicked = new EventEmitter<void>();
  onCarFormClick() {
    this.carFormClicked.emit();
  }
  onFactureClick() {
    console.log("ato");
    this.activeFactureClicked.emit();
  }
  visits = [
    { id:'0',car: 'Mazda', date: '02-05-2025', service: 'Réparation' },
    { id:'1',car: 'Mercedes', date: '02-05-2025', service: 'Entretien' }
  ];
  cars = [
    { brand: 'Mazda', year: 2019, number: '1905TAE' },
    { brand: 'Mercedes', year: 2012, number: '1767TAE' }
  ];
}
