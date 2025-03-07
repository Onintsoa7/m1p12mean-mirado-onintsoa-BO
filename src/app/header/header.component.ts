import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isHeaderVisible = false;
  isMenuOpen = false;
  isServicesMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isHeaderVisible = scrollPosition > 200;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleServicesMenu(event: Event) {
    event.preventDefault();
    this.isServicesMenuOpen = !this.isServicesMenuOpen;
  }
}
