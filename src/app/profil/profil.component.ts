import { Component } from '@angular/core';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { ProfilContainerComponent } from './profil-container/profil-container.component';
import { ProfilDataComponent } from './profil-data/profil-data.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
import { ProfilCarComponent } from "./profil-car/profil-car.component";
@Component({
  selector: 'app-profil',
  imports: [CommonModule, HeaderPagesComponent, FooterComponent, NotesComponent, ProfilContainerComponent, ProfilDataComponent, ProfilEditComponent, ProfilCarComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  isEditing = false;
  IscarForm = false;

  
  onEditProfile() {
    this.IscarForm = false;
    this.isEditing = true;
  }

  onCarForm() {
    this.isEditing = false;
    this.IscarForm = true;
  }

  onCancelCarForm() {
    this.IscarForm = false;
  }
  onCancelEdit(): void {
    this.isEditing = false;
  }
}
