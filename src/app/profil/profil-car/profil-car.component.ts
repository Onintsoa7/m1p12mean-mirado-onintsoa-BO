import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { VoitureService } from '../../core/services/frontoffice/voiture.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil-car',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule ,
    MatSnackBarModule
  ],
  templateUrl: './profil-car.component.html',
  styleUrl: './profil-car.component.scss'
})
export class ProfilCarComponent {
  @Input() showVehicule: boolean = false;
  @Output() cancelEdit = new EventEmitter<void>();
  carburants: string[] = ['Essence', 'Diesel', 'Hybride'];
  annees: number[] = [];
  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';
  vehiculeForm: FormGroup;
  isLoading: boolean = false;
  constructor(private readonly fb: FormBuilder,
    private voitureService: VoitureService,
    private router:Router,
    private snackBar: MatSnackBar)
    {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1960; i--) {
      this.annees.push(i);
    }

    this.vehiculeForm = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: ['', Validators.required],
      immatriculation: ['', Validators.required],
      typeCarburant: ['', Validators.required],
      puissance: [0, [Validators.required, Validators.min(1)]],
      kilometrage: [0, [Validators.required, Validators.min(0)]],
      proprietaire: this.id
    });
  }


  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      this.isLoading = true;
      const formValue = this.vehiculeForm.value;
      const newVehicule = {...formValue, proprietaire: this.id};
      this.voitureService.addVoiture(newVehicule).subscribe({
        next: (res) => {
          this.onCancelClick();
          this.isLoading=false;
          this.snackBar.open('Véhicule ajouté avec succès 🚗', 'Fermer', {  
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error('Error adding vehicle:', err);
          this.isLoading = false;
          console.error('Erreur lors de l\'ajout de la voiture ❌:', err);
          this.snackBar.open('Erreur lors de l\'ajout du véhicule.', 'Fermer', { 
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading=false;
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

  onCancelClick(): void {
    this.cancelEdit.emit();
  }
}
