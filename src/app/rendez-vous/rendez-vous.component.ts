import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { FooterComponent } from '../footer/footer.component';
import { Service } from '../core/models/service';
import { ServiceService } from '../core/services/frontoffice/service.service';
import { FormsModule } from '@angular/forms';
import { RendezVousDetailComponent } from "./rendez-vous-detail/rendez-vous-detail.component";

@Component({
  selector: 'app-rendez-vous',
  imports: [CommonModule, HeaderPagesComponent, FooterComponent, FormsModule, RendezVousDetailComponent],
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {

  rendezVousSelectionne: number | null = null;
  rendezVousList: any[] = [];
  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';
  selectedRendezVous: Service | null = null;
  searchQuery: string = '';
  isDetailRendezVousOpened: boolean = false;
  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getRendezVousList();
  }


  getRendezVousList(): void {
    this.serviceService.getServiceByIdUser(this.id).subscribe({
      next: (result: Service | Service[]) => {
        const services = Array.isArray(result) ? result : [result];
        this.rendezVousList = services.map(service => ({
          _id: service._id,
          user: service.user,
          voiture: service.voiture,
          typeService: service.typeService,
          piece: service.piece,
          avecPiece: service.avecPiece,
          prixPiece: service.prixPiece,
          description: service.description,
          visibleSymptom: service.visibleSymptom,
          image: service.image,
          typeEntretien: service.typeEntretien,
          pieceAreparer: service.pieceAreparer,
          date: service.date,
          dateDerniereEntretien: service.dateDerniereEntretien,
          dateSuggestionVisite: service.dateSuggestionVisite,
          heureSuggestionVisite: service.heureSuggestionVisite,
          dateFixeVisite: service.dateFixeVisite,
          heureFixeVisite: service.heureFixeVisite,
          montantFinal: service.montantFinal,
          duree: service.duree,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
          serviceObject: service 
        }));
        console.log('Retrieved services:', this.rendezVousList.length);
      },
      error: (err) => console.error('Erreur lors de la récupération des services : ', err)
    });
  }
  getEtatIcon(etat: string): { icon: string, class: string } {
    switch (etat) {
      case 'Valider':
        return { icon: 'fa-check-circle', class: 'valider' };
      case 'Repousser':
        return { icon: 'fa-minus-circle', class: 'repousser' };
      case 'devis':
        return { icon: 'fa-solid fa-square-poll-vertical', class: 'pas-valider' };
      default:
        return { icon: 'fa-question-circle', class: 'inconnu' };
    }
  }

  onClickRendezVous(index: number): void {
    this.isDetailRendezVousOpened = true;
    const selectedService = this.rendezVousList[index];
    this.selectedRendezVous = selectedService.serviceObject; // On passe l'objet complet au composant enfant
    this.rendezVousSelectionne = this.rendezVousSelectionne === index ? null : index;
    console.log('====================================');
    console.log(this.selectedRendezVous?.typeService);
    console.log('====================================');
  }
}
