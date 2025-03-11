import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profil-container',
  imports: [CommonModule],
  templateUrl: './profil-container.component.html',
  styleUrl: './profil-container.component.scss'
})
export class ProfilContainerComponent {
  showProfil = false;
  // showProfilEdit(){
  //   this.showProfil = !this.showProfil;
  // }
  @Output() actionEvent = new EventEmitter<boolean>();
  triggerParentFunction() {
    this.actionEvent.emit(true);
  }
}
