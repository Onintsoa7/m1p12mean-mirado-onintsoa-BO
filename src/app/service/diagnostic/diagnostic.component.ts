import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-diagnostic',
  imports: [CommonModule, 
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule],
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss' , '../service.component.scss']
})
export class DiagnosticComponent {
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;
  
}
