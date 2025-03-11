import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profil-container',
  imports: [CommonModule],
  templateUrl: './profil-container.component.html',
  styleUrl: './profil-container.component.scss'
})
export class ProfilContainerComponent {
  @Output() editClicked = new EventEmitter<void>();

  onEditClick() {
    this.editClicked.emit();
  }
}
