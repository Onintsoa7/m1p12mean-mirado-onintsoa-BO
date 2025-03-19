import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-reparation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Ajouté pour gérer les formulaires réactifs
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule // ✅ Ajouté pour corriger l'erreur NG8001
  ],
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss', '../service.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Ajouté pour éviter les erreurs Angular liées aux composants inconnus
})
export class ReparationComponent {
  piecesReparables = [
    { category: "Moteur", pieces: ["Bougies d’allumage", "Injecteurs", "Courroie de distribution", "Culasse", "Radiateur", "Pompe à eau"] },
    { category: "Système de refroidissement", pieces: ["Radiateur", "Thermostat", "Pompe à eau", "Ventilateur", "Liquide de refroidissement"] },
    { category: "Alimentation en carburant", pieces: ["Pompe à essence", "Filtre à carburant", "Injecteurs", "Vanne EGR"] },
    { category: "Transmission", pieces: ["Embrayage", "Volant moteur", "Cardans", "Boîte de vitesse", "Convertisseur de couple"] },
    { category: "Système de freinage", pieces: ["Plaquettes de frein", "Disques de frein", "Étriers", "Tambours", "Maître-cylindre", "Liquide de frein"] },
    { category: "Suspension et direction", pieces: ["Amortisseurs", "Rotules", "Biellettes de direction", "Crémaillère", "Ressorts de suspension"] },
    { category: "Échappement", pieces: ["Pot catalytique", "Silencieux", "Collecteur d’échappement", "Filtre à particules (FAP)"] },
    { category: "Démarrage et charge", pieces: ["Batterie", "Alternateur", "Démarreur", "Fusibles", "Câbles de masse"] },
    { category: "Système électrique", pieces: ["Faisceau électrique", "Capteurs ABS", "Relais", "Commodo", "Moteurs d’essuie-glace"] },
    { category: "Climatisation et ventilation", pieces: ["Compresseur de climatisation", "Condenseur", "Évaporateur", "Ventilateurs", "Filtre d’habitacle"] },
    { category: "Éclairage et signalisation", pieces: ["Phares", "Feux arrière", "Clignotants", "Feux stop", "Feux antibrouillard"] },
    { category: "Carrosserie et vitrage", pieces: ["Portières", "Capot", "Pare-brise", "Vitres électriques", "Rétroviseurs"] },
    { category: "Roues et pneumatiques", pieces: ["Pneus", "Jantes", "Roulements de roue", "Valves de pression"] },
    { category: "Systèmes de sécurité", pieces: ["Airbags", "Ceintures de sécurité", "ABS", "ESP", "Capteurs de collision"] }
  ];

  selectedCategory: string = "";
  filteredPieces: string[] = [];
  pieceControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  selectedPieces: string[] = [];

  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;

  constructor() {
    this.filteredOptions = this.pieceControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPieces(value ?? '')) // ✅ Correction du problème `null`
    );
  }

  updateFilteredPieces() {
    const selected = this.piecesReparables.find(p => p.category === this.selectedCategory);
    this.filteredPieces = selected ? selected.pieces : [];
    this.pieceControl.setValue('');
  }

  private filterPieces(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.filteredPieces.filter(piece => piece.toLowerCase().includes(filterValue));
  }

  addPiece(piece: string) {
    if (piece && !this.selectedPieces.includes(piece)) {
      this.selectedPieces.push(piece);
      this.pieceControl.setValue('');
    }
  }

  removePiece(piece: string) {
    this.selectedPieces = this.selectedPieces.filter(p => p !== piece);
  }
}
