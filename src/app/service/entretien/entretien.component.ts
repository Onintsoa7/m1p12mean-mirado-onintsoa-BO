import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceService } from '../../core/services/frontoffice/service.service';
import { TypeService } from '../../core/models/type-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Voiture } from '../../core/models/voiture';
import { Service } from '../../core/models/service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-entretien',
  imports: [
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.scss', '../service.component.scss'],
})
export class EntretienComponent implements OnInit, AfterViewInit {
  mesEntretiens: TypeService[] = [];
  mesVoitures: Voiture[] = [];
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;
  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';
  entretienForm!: FormGroup;
  constructor(
    public serviceService: ServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEntretienCategories();
    this.getListVoitures();
    this.initForm();
  }
  getEntretienCategories(): void {
    this.serviceService.getTypeServiceByNom('Entretien').subscribe({
      next: (data) => {
        this.mesEntretiens = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories', err);
      },
    });
  }

  onEntretienChange(event: any): void {
    const selectedEntretien = event.value;
  }

  initForm() {
    this.entretienForm = this.fb.group({
      typeService: [null, Validators.required],
      voiture: [null, Validators.required],
      dateDerniereEntretien: [null],
      dateSuggestionVisite: ['', Validators.required],
      heureSuggestionVisite: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  onVoitureChange(event: any): void {
    const selectedVoiture = event.value;
  }
  getListVoitures(): void {
    this.serviceService.getVoitureById(this.id).subscribe({
      next: (data) => {
        this.mesVoitures = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des voitures', err);
      },
    });
  }

  submitForm(): void {
    if (this.entretienForm.invalid) return;

    const formValue = this.entretienForm.value;

    const newEntretien: Service = {
      user: this.id,
      voiture: formValue.voiture,
      typeService: formValue.typeService,
      dateDerniereEntretien: formValue.dateDerniereEntretien,
      dateSuggestionVisite: new Date(formValue.dateSuggestionVisite),
      heureSuggestionVisite: formValue.heureSuggestionVisite,
      etat:"devis"
    };
    console.log(newEntretien);
    this.serviceService.addService(newEntretien).subscribe({
      next: (res) => {
        this.router.navigate(['/rendezvous']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
