import { Component, HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  services = [
    { title: "Réparation", description: "Réparation mécanique, électronique et carrosserie.", image: "" },
    { title: "Entretien", description: "Maintenance périodique complète et rapide.", image: "" },
    { title: "Vente de véhicules", description: "Découvrez notre sélection de voitures de qualité.", image: "" }
  ];
  isHeaderVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isHeaderVisible = scrollPosition > 500; // Rend le header visible après 100px de scroll
  }
}
