import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Vérifier si localStorage est disponible (utile pour SSR)
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Récupérer le token
  getToken(): string | null {
    if (!this.isLocalStorageAvailable()) return null;
    return localStorage.getItem('token');
  }

  // Récupérer l'utilisateur connecté
  getUser(): any {
    if (!this.isLocalStorageAvailable()) return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Déconnexion
  logout(): void {
    if (!this.isLocalStorageAvailable()) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
