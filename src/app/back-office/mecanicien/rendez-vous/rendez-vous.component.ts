import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    NzCardModule,
    NzDividerModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.scss'
})
export class RendezVousComponent {
  todo = [
    {
      date: '2023-05-01',
      heure: '10:00',
      marque: 'Toyota',
      matricule: 'ABC123',
      type_services: 'Diagnostic',
      partie: 'Moteur',
      pieces: ['Injecteur']
    },
    {
      date: '2023-05-01',
      heure: '14:00',
      marque: 'Toyota',
      matricule: 'ABC123',
      type_services: 'Diagnostic',
      partie: 'Moteur',
      pieces: ['Filtre de carburant']
    },
    {
      date: '2023-05-01',
      heure: '14:00',
      marque: 'Toyota',
      matricule: 'ABC123',
      type_services: 'Diagnostic',
      partie: 'Vitesse',
      pieces: ['Câble Embrayage']
    }
  ];

  inProgress: any[] = [];
  done: any[] = [];

  // Liste de toutes les pièces disponibles
  pieces: { id: number; nom: string }[] = [];

  // Données de facturation par tache terminée
  facturations: {
    data: any;
    dureeTravail: string;
    selectedPieces: string[];
  }[] = [];

  constructor() {
    this.initPieces();
  }

  initPieces() {
    const set = new Set<string>();
    this.todo.forEach(item => item.pieces.forEach(p => set.add(p)));

    const autresPieces = ['Bougie', 'Batterie', 'Radiateur', 'Filtre à air', 'Courroie'];
    autresPieces.forEach(p => set.add(p));

    this.pieces = Array.from(set).map((nom, index) => ({ id: index + 1, nom }));
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.container.id === 'doneList') {
        const task = event.container.data[event.currentIndex];
        this.facturations.push({
          data: task,
          dureeTravail: '',
          selectedPieces: [...task.pieces]
        });
      }
    }
  }

  facturer(facture: any) {
    console.log('Facturation envoyée :', facture);
    // Tu peux ici envoyer vers un backend ou stocker
  }
}
