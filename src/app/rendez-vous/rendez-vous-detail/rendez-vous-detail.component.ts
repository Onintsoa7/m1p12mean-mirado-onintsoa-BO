import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../../core/models/service';
import { CommonModule } from '@angular/common';
import { TypeService } from '../../core/models/type-service';
import { Voiture } from '../../core/models/voiture';
import { Piece } from '../../core/models/piece';

@Component({
  selector: 'app-rendez-vous-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './rendez-vous-detail.component.html',
  styleUrls: ['./rendez-vous-detail.component.scss']
})
export class RendezVousDetailComponent implements OnInit {

  @Input() rendezVous!: Service;

  // Les variables castées
  typeService!: TypeService;
  voiture!: Voiture;
  pieces!: Piece[];

  ngOnInit(): void {
    // 🔥 Cast des données avant de les envoyer au frontend
    this.typeService = this.castTypeService(this.rendezVous.typeService);
    this.voiture = this.castVoiture(this.rendezVous.voiture);
    this.pieces = this.castPieces(this.rendezVous.piece);

    console.log('TypeService casté :', this.typeService);
    console.log('Voiture castée :', this.voiture);
    console.log('Pièces castées :', this.pieces);
  }

  castTypeService(typeService: any): TypeService {
    return typeService as TypeService;
  }

  castVoiture(voiture: any): Voiture {
    return voiture as Voiture;
  }

  castPieces(pieces: any): Piece[] {
    return Array.isArray(pieces) ? pieces as Piece[] : [];
  }
}
