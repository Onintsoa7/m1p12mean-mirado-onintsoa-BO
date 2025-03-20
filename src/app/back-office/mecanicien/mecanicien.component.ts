import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { SidebarMecanicienComponent } from "../sidebar-mecanicien/sidebar-mecanicien.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-mecanicien',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SidebarMecanicienComponent,
    RouterOutlet
],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.scss'
})
export class MecanicienComponent {

}
