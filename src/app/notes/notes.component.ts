import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  rating: number = 0; // Note actuelle (0 signifie non noté)
  hoveredText: string = ""; // Texte affiché lors du survol
  emojis: string[] = ["😡", "🙁", "😐", "🙂", "😃"]; 
  descriptions: string[] = [
    "Service catastrophique ! 🚨",
    "Peut mieux faire... 🛠️",
    "Correct mais sans plus 🚗",
    "Bon service, satisfait ! 👍",
    "Excellent ! Travail de pro ! 🏆"
  ];

  setRating(index: number) {
    this.rating = index + 1; // Met à jour la note (1 à 5)
    console.log('Nouvelle note:', this.rating);
  }

  setHoveredText(index: number) {
    this.hoveredText = this.descriptions[index]; // Définit le texte au survol
  }

  clearHoveredText() {
    this.hoveredText = ""; // Efface le texte lorsque la souris quitte l'emoji
  }
}
