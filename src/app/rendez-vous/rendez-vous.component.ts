import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { FooterComponent } from '../footer/footer.component';
import { RendezVousEditComponent } from './rendez-vous-edit/rendez-vous-edit.component';
import { Observable } from 'rxjs';
import { Voiture } from '../core/models/voiture';
import { TypeService } from '../core/models/type-service';
import { Service } from '../core/models/service';
import { ServiceService } from '../core/services/frontoffice/service.service';
import { RendezVousDetailComponent } from './rendez-vous-detail/rendez-vous-detail.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rendez-vous',
  imports: [CommonModule, HeaderPagesComponent, FooterComponent, RendezVousEditComponent, RendezVousDetailComponent, FormsModule],
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
  filteredRendezVousList: any[] | undefined;
  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getRendezVousList();
  }

  searchServices(): void {
    if (!this.searchQuery.trim()) {
      this.filteredRendezVousList = [...this.rendezVousList];
      return;
    }

    this.serviceService.searchServices(this.searchQuery).subscribe({
      next: (services: Service[]) => {
        this.filteredRendezVousList = services;
      },
      error: (err) => console.error('Erreur lors de la recherche de services : ', err)
    });
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
          serviceObject: service // Stocke l'objet complet pour affichage des détails
        }));
        console.log('Retrieved services:', this.rendezVousList);
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
      case 'Pas encore validé':
        return { icon: 'fa-info-circle', class: 'pas-valider' };
      default:
        return { icon: 'fa-question-circle', class: 'inconnu' };
    }
  }

  onClickRendezVous(index: number): void {
    const selectedService = this.rendezVousList[index];
    this.selectedRendezVous = selectedService.serviceObject; // On passe l'objet complet au composant enfant
    this.rendezVousSelectionne = this.rendezVousSelectionne === index ? null : index;
  }
}
