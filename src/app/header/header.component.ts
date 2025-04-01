import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SigninService } from '../core/services/signin.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHeaderVisible = false;
  isMenuOpen = false;
  isServicesMenuOpen = false;
  hasConnectedUSer = false;

  ngOnInit(): void {
    const storedUser = this.signin.getConnectedUser();
    if (storedUser) {
      this.hasConnectedUSer = true;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isHeaderVisible = scrollPosition > 200;
  }
  servicesMenu = [
    { id: 1, title: "Diagnostic"},
    { id: 2, title: "Entretien"},
    { id: 3, title: "Réparation"}
  ];
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private router: Router,
              private signin : SigninService
  ) {}

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
  isLogin(){
    console.log('isLogin');
    this.hasConnectedUSer = true;
  }

  deconnexion(){
    this.signin.deconnexion();
    this.hasConnectedUSer = false;
    this.router.navigate(['/landing-page']);
  }
}
