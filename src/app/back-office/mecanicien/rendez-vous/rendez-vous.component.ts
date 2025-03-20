import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { SidebarMecanicienComponent } from '../../sidebar-mecanicien/sidebar-mecanicien.component';


@Component({
  selector: 'app-rendez-vous',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SidebarMecanicienComponent,
  ],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.scss'
})
export class RendezVousComponent {

}
