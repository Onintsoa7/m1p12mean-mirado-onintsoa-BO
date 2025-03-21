import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './service/service.component';
import { ProfilComponent } from './profil/profil.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { MecanicienComponent } from './back-office/mecanicien/mecanicien.component';
import { RendezVousComponent as MecanicienRdv } from './back-office/mecanicien/rendez-vous/rendez-vous.component';
import { DashboardComponent } from './back-office/mecanicien/dashboard/dashboard.component';
import { AdminComponent } from './back-office/admin/admin.component';
import { DashboardComponent as AdminDashboard } from './back-office/admin/dashboard/dashboard.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent  },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'services/:id', component: ServiceComponent },
  { path: 'profiles', component: ProfilComponent },
  { path: 'rendezvous', component: RendezVousComponent },
  // back-office
  { path: 'backoffice', component: BackOfficeComponent },
  {
    path: 'backoffice/mecanicien',
    component: MecanicienComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'rendezvous', component: MecanicienRdv }
    ]
  },
  {
    path: 'backoffice/admin',
    component: AdminComponent,
    children: [
      {
        path:'',component:AdminDashboard
      }
    ]
  }
];
