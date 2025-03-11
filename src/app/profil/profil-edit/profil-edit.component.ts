import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profil-edit',
  imports: [],
  templateUrl: './profil-edit.component.html',
  styleUrl: './profil-edit.component.scss'
})
export class ProfilEditComponent {
  @Input() showProfil: boolean = false;
}
