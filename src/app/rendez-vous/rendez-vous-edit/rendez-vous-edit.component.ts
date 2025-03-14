import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rendez-vous-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './rendez-vous-edit.component.html',
  styleUrls: ['./rendez-vous-edit.component.scss']
})
export class RendezVousEditComponent {
  @Input() rendezVous: any;
  @Output() modifieRendezVous = new EventEmitter<any>();
  @Output() supprimeRendezVous = new EventEmitter<any>();

  modifier() {
    this.modifieRendezVous.emit(this.rendezVous);
  }

  supprimer() {
    this.supprimeRendezVous.emit(this.rendezVous);
  }
}
