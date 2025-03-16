import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './service/service.component';
import { ProfilComponent } from './profil/profil.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';

export const routes: Routes = [
  { path: '', redirectTo: 'rendezvous', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'services/:id', component: ServiceComponent },
  { path: 'profiles', component: ProfilComponent },
  { path: 'rendezvous', component: RendezVousComponent }
];
