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
    MatFormFieldModule
  ],
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss', '../service.component.scss']
})
export class DiagnosticComponent implements AfterViewInit, OnInit {
  categories: TypeService[] = [];
  mesVoitures: Voiture[] = [];
  diagnosticForm!: FormGroup;
  storedUser = sessionStorage.getItem('connected_user');
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;

  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder,
        private signin : SigninService
  ) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('connected_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
    }
    this.diagnosticForm = this.fb.group({
      typeService: [null, Validators.required],
      description: [''],
      visibleSymptom: ['false'],
      image: [null],
      dateFixeVisite: ['', Validators.required],
      heureFixeVisite: ['', Validators.required]
    });

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

  getListVoitures(): void {
    let id = this.storedUser ? JSON.parse(this.storedUser)._id : '';
    this.serviceService.getVoitureById(id).subscribe({
      next: (data) => {
        this.mesVoitures = Array.isArray(data) ? data : [data];
        console.log(this.mesVoitures," ID EH");
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

    const newService: Service = {
      user: 'USER_ID',
      voiture: 'VOITURE_ID',
      typeService: formValue.typeService._id,
      description: formValue.description,
      visibleSymptom: formValue.visibleSymptom === 'true',
      dateFixeVisite: new Date(formValue.dateFixeVisite),
      heureFixeVisite: formValue.heureFixeVisite,
    };

    this.serviceService.addService(newService).subscribe({
      next: (res) => {
        alert('Demande envoyée avec succès !');
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

