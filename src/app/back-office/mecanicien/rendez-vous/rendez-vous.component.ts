import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList, 
    CdkDrag
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
      piece: 'Injecteur',
    },
    {
      date: '2023-05-01',
      heure: '14:00',
      marque: 'Toyota',
      matricule: 'ABC123',
      type_services: 'Diagnostic',
      partie: 'Moteur',
      piece: 'Filtre de carburant',
    },
    {
      date: '2023-05-01',
      heure: '14:00',
      marque: 'Toyota',
      matricule: 'ABC123',
      type_services: 'Diagnostic',
      partie: 'Vitesse',
      piece: 'Câble Embrayage',
    }
  ];

  inProgress: any[] = [];
  done: any[] = [];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
