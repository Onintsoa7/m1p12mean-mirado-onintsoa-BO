import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profil-car',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './profil-car.component.html',
  styleUrl: './profil-car.component.scss'
})
export class ProfilCarComponent {
  @Input() showVehicule: boolean = false;
  @Output() cancelEdit = new EventEmitter<void>();
  carburants: string[] = ['Essence', 'Diesel', 'Hybride'];
  annees: number[] = [];

  vehiculeForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {
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
      proprietaire: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      console.log('Données du véhicule :', this.vehiculeForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  onCancelClick(): void {
    this.cancelEdit.emit();
  }
}
