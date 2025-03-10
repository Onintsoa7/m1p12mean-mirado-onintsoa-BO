import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-pages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-pages.component.html',
  styleUrl: './header-pages.component.scss'
})
export class HeaderPagesComponent {
  isMenuOpen = false;
  isServicesMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleServicesMenu(event: Event) {
    event.preventDefault();
    this.isServicesMenuOpen = !this.isServicesMenuOpen;
  }
}
