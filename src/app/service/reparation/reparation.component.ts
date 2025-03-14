import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reparation',
  imports: [CommonModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSelectModule,
        MatFormFieldModule
  ],
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss', '../service.component.scss']
})
export class ReparationComponent {
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;
}
