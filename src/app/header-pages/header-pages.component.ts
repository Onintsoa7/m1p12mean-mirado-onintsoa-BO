import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SigninService } from '../core/services/signin.service';

@Component({
  selector: 'app-header-pages',
  imports: [CommonModule],
  templateUrl: './header-pages.component.html',
  styleUrl: './header-pages.component.scss'
})
export class HeaderPagesComponent implements OnInit {
  isMenuOpen = false;
  isServicesMenuOpen = false;
  hasConnectedUSer = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private router: Router,
              private signin : SigninService) {}
  ngOnInit(): void {
    const storedUser = this.signin.getConnectedUser();
    if (storedUser) {
      this.hasConnectedUSer = true;
    }
  }
  servicesMenu = [
    { id: 1, title: "Diagnostic"},
    { id: 2, title: "Entretien"},
    { id: 3, title: "Réparation"}
  ];

  toggleServicesMenu(event: Event) {
    event.preventDefault();
    this.isServicesMenuOpen = !this.isServicesMenuOpen;
  }
  navigateToService(service: any) {
    this.router.navigate(['/services', service.id]);
  }
  navigateToProfil() {
    this.router.navigate(['/profiles']);
  }
  navigateToRendezVous() {
    this.router.navigate(['/rendezvous']);
  }
  navigateToLandingPage() {
    this.router.navigate(['/landing-page']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  deconnexion(){
    this.signin.deconnexion();
    this.hasConnectedUSer = false;
    this.router.navigate(['/landing-page']);
  }
}
