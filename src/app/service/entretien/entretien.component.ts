import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-entretien',
  imports: [CommonModule, 
      MatStepperModule,
      MatInputModule,
      MatButtonModule,
      MatRadioModule,
      MatSelectModule,
      MatFormFieldModule],
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.scss', '../service.component.scss']
})
export class EntretienComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    if (changes['serviceImage']) {
      console.log('Service Image received in EntretienComponent:', this.serviceImage);
    }
  }
  @Input() serviceImage!: string;
  @Input() serviceTitle!: string;
  ngOnInit(): void {
    console.log(this.serviceImage, "IMAGE");
  }
}
