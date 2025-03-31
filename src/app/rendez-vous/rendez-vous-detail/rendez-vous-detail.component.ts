import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../../core/models/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rendez-vous-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './rendez-vous-detail.component.html',
  styleUrls: ['./rendez-vous-detail.component.scss']
})
export class RendezVousDetailComponent implements OnInit {

  @Input() rendezVous!: Service;

  ngOnInit(): void {
    console.log('Rendez-vous sélectionné :', this.rendezVous);
  }
}
