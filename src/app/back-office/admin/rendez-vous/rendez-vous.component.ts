import { Component, OnInit } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ServiceService } from '../../../core/services/frontoffice/service.service';
import { Service } from '../../../core/models/service';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    NzBadgeModule,
    NzCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzFormModule,
    NzButtonModule
  ],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.scss'
})
export class RendezVousComponent implements OnInit {
  selectedDate: string = new Date().toLocaleDateString('fr-CA');
  selectedDateObject: Date = new Date();
  selectedRDVIndex: number | null = null;
  formRendezVous: FormGroup;

  mecaniciens = ['Mickael', 'Jean', 'Tiana', 'Andry'];

  ngOnInit(): void {
      this.loadRendezVous();
  }

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {
    this.formRendezVous = this.fb.group({
      mecanicien: [null, Validators.required],
      date: [null, Validators.required],
      heure: [null, Validators.required],
      estimationReparation: [null, Validators.required]
    });
  }

  rendezVousData: Service[] = [];
  getRendezVousDuJour(date: Date) {
    const key = date.toLocaleDateString('fr-CA');
    return this.rendezVousData.filter(rdv => rdv.dateSuggestionVisite);
  }

  getRendezVousSelected() {
    // return this.rendezVousData.filter(rdv => rdv.dateSuggestionVisite === this.selectedDate);
  }

  onSelectChange(date: Date): void {
    this.selectedDateObject = date;
    this.selectedDate = date.toLocaleDateString('fr-CA');
    this.selectedRDVIndex = null;
  }

  openForm(index: number, rdv: any): void {
    if (rdv.status === 'Validé') return;
    this.selectedRDVIndex = index;
    this.formRendezVous.patchValue({
      mecanicien: null,
      date: new Date(rdv.dateSuggestionVisite),
      heure: rdv.heure,
    });
  }

  submitForm(): void {
    if (this.formRendezVous.valid) {
      console.log(' Affectation du mécanicien :', this.formRendezVous.value);
    }
  }
  loadRendezVous(): void {
    this.serviceService.getServices().subscribe({
      next: (data: Service[]) => {
        this.rendezVousData = data;
        console.log("Données chargées:", this.rendezVousData);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des services:", err);
      }
    });
  }
}
