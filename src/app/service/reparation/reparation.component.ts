import { MatTableModule } from '@angular/material/table';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Piece } from '../../core/models/piece';
import { ServiceService } from '../../core/services/frontoffice/service.service';
import { Router } from '@angular/router';
import { Voiture } from '../../core/models/voiture';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Service } from '../../core/models/service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
export interface DisplayedPiece extends Piece {
  alreadyHave: boolean;
}

@Component({
  selector: 'app-reparation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss', '../service.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReparationComponent implements OnInit {
  piecesReparables: Piece[] = [];
  selectedPieces: DisplayedPiece[] = [];
  mesVoitures: Voiture[] = [];
  mesPieces: Piece[] = [];
  allPieces: Piece[] = [];
  pieceControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';
  displayedColumns: string[] = ['piece', 'alreadyHave', 'actions'];
  dataSource = new MatTableDataSource<DisplayedPiece>(this.selectedPieces);
  reparationForm!: FormGroup;
  repartionId!: string;
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;
  isLoading: boolean = false;
  initForm(){
    this.reparationForm = this.fb.group({
      voiture:[null, Validators.required],
      dateDerniereEntretien:[null],
      dateSuggestionVisite: ['', Validators.required],
      heureSuggestionVisite: ['', Validators.required]
    });
  }
  constructor(public serviceService: ServiceService,
      private fb: FormBuilder, private router: Router,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getListPieces();
    this.getListVoitures();
    this.getTypeServiceReparation();
    this.initForm();
    this.filteredOptions = this.pieceControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPieces(value ?? ''))
    );
  }

  private filterPieces(value: string): string[] {
    const filterValue = value.toLowerCase();

    const availablePieces = this.allPieces.filter(piece =>
      !this.selectedPieces.find(p => p.fille === piece.fille)
    );

    return availablePieces
      .filter(piece => piece.fille?.toLowerCase().includes(filterValue))
      .map(piece => piece.fille as string);
  }

  addPiece(fille: string) {
    const piece = this.allPieces.find(p => p.fille === fille);
    if (piece && !this.selectedPieces.some(p => p._id === piece._id)) {
      const newPiece: DisplayedPiece = { _id: piece._id || '', mere: piece.mere, fille: piece.fille || '', alreadyHave: false };
      this.selectedPieces.push(newPiece);
      this.updateTable();
      this.pieceControl.setValue('');
      this.updateFilteredOptions();
    }
  }

  removePiece(piece: DisplayedPiece) {
    this.selectedPieces = this.selectedPieces.filter(p => p.fille !== piece.fille);
    this.updateTable();
    this.updateFilteredOptions();
  }

  updateTable() {
    this.dataSource.data = [...this.selectedPieces];
  }

  updateFilteredOptions() {
    this.filteredOptions = this.pieceControl.valueChanges.pipe(
      startWith(this.pieceControl.value || ''),
      map(value => this.filterPieces(value ?? ''))
    );
  }

  onVoitureChange(event: any): void {
    const selectedVoiture = event.value;
    console.log("Voiture sélectionnée : ", selectedVoiture);
  }

  onCheckboxChange(piece: DisplayedPiece): void {
    console.log(`La pièce "${piece.fille}" est maintenant : ${piece.alreadyHave ? 'Disponible' : 'Non disponible'}`);
  }

  getListVoitures(): void {
    this.serviceService.getVoitureById(this.id).subscribe({
      next: (data) => {
        this.mesVoitures = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des voitures', err);
      }
    });
  }
  getTypeServiceReparation(): void {
    this.serviceService.getTypeServiceByNom("Réparation").subscribe({
      next: (data) => {
        const serviceType = Array.isArray(data) ? data[0] : data;
        if (serviceType) {
          console.log(serviceType);
          this.repartionId = serviceType._id ?? '';
        } else {
          console.error('Aucun type de service trouvé pour Réparation.');
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement du type de service Réparation', err);
      },
    });
  }
  getListPieces(): void {
    this.serviceService.getPieces().subscribe({
      next: (data) => {
        this.allPieces = Array.isArray(data) ? data : [data];
        this.updateFilteredOptions();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pièces', err);
      }
    });
  }

  submitForm(): void {
    if (this.reparationForm.invalid) {
      Object.keys(this.reparationForm.controls).forEach(controlName => {
        const controlErrors = this.reparationForm.get(controlName)?.errors;
        if (controlErrors) {
          console.error(`- ${controlName}:`, controlErrors);
        }
      });
      return;
    }

    const formValue = this.reparationForm.value;

    this.isLoading = true; // Démarrer le loader
    const selectedPieceIds = this.selectedPieces.map(p => p._id!);
    const avecPieceValues = this.selectedPieces.map(p => p.alreadyHave);
    const newService: Service = {
      user: this.id,
      voiture: formValue.voiture,
      piece: selectedPieceIds,
      avecPiece: avecPieceValues,
      dateDerniereEntretien: formValue.dateDerniereEntretien,
      dateSuggestionVisite: formValue.dateSuggestionVisite ? new Date(formValue.dateSuggestionVisite) : undefined,
      heureSuggestionVisite: formValue.heureSuggestionVisite,
      typeService: this.repartionId!,
      etat:"devis"
    };
    this.serviceService.addService(newService).subscribe({
      next: (res) => {
        this.isLoading = false; // Arrêter le loader
        this.snackBar.open('Demande de devis envoyée avec succès!', 'Fermer', { duration: 3000, panelClass: 'success-snackbar' });
        this.router.navigate(['/rendezvous']);
      },
      error: (err) => {
        this.isLoading = false; // Arrêter le loader
        this.snackBar.open('Erreur lors de l\'envoi du devis.', 'Fermer', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }
}
