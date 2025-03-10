import { Component } from '@angular/core';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, HeaderPagesComponent, FooterComponent, NotesComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  visits = [
    { car: 'Mazda', date: '02-05-2025', service: 'Réparation' },
    { car: 'Mercedes', date: '02-05-2025', service: 'Entretien' }
  ];
  cars = [
    { brand: 'Mazda', year: 2019, number: '1905TAE' },
    { brand: 'Mercedes', year: 2012, number: '1767TAE' }
  ];

}
