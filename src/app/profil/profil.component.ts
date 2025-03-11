import { Component } from '@angular/core';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { ProfilContainerComponent } from './profil-container/profil-container.component';
import { ProfilDataComponent } from './profil-data/profil-data.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
@Component({
  selector: 'app-profil',
  imports: [CommonModule, HeaderPagesComponent, FooterComponent, NotesComponent,ProfilContainerComponent,ProfilDataComponent,ProfilEditComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  showProfil = false;
  showProfilEdit(){
    this.showProfil = !this.showProfil;
  }
}
