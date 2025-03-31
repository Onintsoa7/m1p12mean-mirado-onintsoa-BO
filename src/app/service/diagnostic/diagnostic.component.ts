import { User } from './../../core/models/user';
import {
  Component, Input, AfterViewInit, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatStepperModule
} from '@angular/material/stepper';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatRadioModule
} from '@angular/material/radio';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { ServiceService } from '../../core/services/frontoffice/service.service';
import { TypeService } from '../../core/models/type-service';
import { Service } from '../../core/models/service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Voiture } from '../../core/models/voiture';
import { SigninService } from '../../core/services/signin.service';
import { identity } from 'rxjs';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-diagnostic',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss', '../service.component.scss']
})
export class DiagnosticComponent implements AfterViewInit, OnInit {
  categories: TypeService[] = [];
  mesVoitures: Voiture[] = [];
  diagnosticForm!: FormGroup;
  storedUser = sessionStorage.getItem('connected_user');
  id: string = this.storedUser ? JSON.parse(this.storedUser)._id : '';
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;

  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private signin : SigninService,
    private router : Router
  ) {}

  initForm(){
    this.diagnosticForm = this.fb.group({
      typeService: [null, Validators.required],
      voiture:[null, Validators.required],
      description: [''],
      dateDerniereEntretien:[null],
      visibleSymptom: [null, Validators.required],
      dateSuggestionVisite: ['', Validators.required],
      heureSuggestionVisite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('connected_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
    }
    this.initForm();
    this.getDiagnosticCategories();
    this.getListVoitures();
  }

  getDiagnosticCategories(): void {
    this.serviceService.getTypeServiceByNom("Diagnostic").subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error("Erreur lors du chargement des catégories", err);
      }
    });
  }
  onVoitureChange(event: any): void {
    const selectedVoiture = event.value;
  }
  onTypeServiceChange(event: any): void {
    const selectedTypeService = event.value;
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.diagnosticForm.patchValue({ image: file });
  }

  submitForm(): void {
    if (this.diagnosticForm.invalid) return;

    const formValue = this.diagnosticForm.value;

    const newDiagnostic: Service = {
      user: this.id,
      voiture: formValue.voiture,
      typeService: formValue.typeService,
      dateDerniereEntretien: formValue.dateDerniereEntretien,
      description: formValue.description,
      visibleSymptom: formValue.visibleSymptom,
      dateSuggestionVisite: new Date(formValue.dateSuggestionVisite),
      heureSuggestionVisite: formValue.heureSuggestionVisite,
      etat:""
    };
    console.log(newDiagnostic);
    this.serviceService.addService(newDiagnostic).subscribe({
      next: (res) => {
        this.router.navigate(['/rendezvous']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
}

