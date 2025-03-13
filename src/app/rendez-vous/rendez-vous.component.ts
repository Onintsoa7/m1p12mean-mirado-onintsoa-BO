import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { FooterComponent } from '../footer/footer.component';
import { RendezVousEditComponent } from './rendez-vous-edit/rendez-vous-edit.component';
@Component({
  selector: 'app-rendez-vous',
  imports: [CommonModule,HeaderPagesComponent,FooterComponent,RendezVousEditComponent],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.scss'
})
export class RendezVousComponent {

    rendezVousSelectionne: number | null = null;
   rendezVousList = [
    {
      date: '02-05-2025',
      heure: '14:00',
      matricule: '1905TAE',
      marque: 'Mazda',
      type_services: 'Entretien',
      etat: 'Valider'
    },
    {
      date: '02-05-2025',
      heure: '14:00',
      matricule: '1767TAE',
      marque: 'Mercedes',
      type_services: 'Réparation',
      etat: 'Repousser'
    },
    {
      date: '02-05-2025',
      heure: '14:00',
      matricule: '2025TAE',
      marque: 'Toyota',
      type_services: 'Vidange',
      etat: 'Pas encore valider'
    }
  ];

  // Méthode pour retourner la classe CSS et l'icône selon l'état
  getEtatIcon(etat: string): { icon: string, class: string } {
    switch(etat) {
      case 'Valider':
        return { icon: 'fa-check-circle', class: 'valider' };
      case 'Repousser':
        return { icon: 'fa-minus-circle', class: 'repousser' };
      case 'Pas encore valider':
        return { icon: 'fa-info-circle', class: 'pas-valider' };
      default:
        return { icon: 'fa-question-circle', class: 'inconnu' };
    }
  }
  editRendezVous(index: number): void {
    this.rendezVousSelectionne = this.rendezVousSelectionne === index ? null : index;
  }
  
}
