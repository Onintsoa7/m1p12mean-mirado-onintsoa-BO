import { Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office/back-office.component';
import { MecanicienComponent } from './back-office/mecanicien/mecanicien.component';
import { DashboardComponent } from './back-office/admin/dashboard/dashboard.component';
import { AdminComponent } from './back-office/admin/admin.component';
import { DashboardComponent as AdminDashboard } from './back-office/admin/dashboard/dashboard.component';
import { MecanicienComponent as mecano } from './back-office/admin/mecanicien/mecanicien.component';
import { RendezVousComponent as adminRendezVous } from './back-office/admin/rendez-vous/rendez-vous.component';
import { RendezVousComponent as MecanicienRdv } from './back-office/mecanicien/rendez-vous/rendez-vous.component';
export const routes: Routes = [
    { path: '', component: BackOfficeComponent},
    { path: 'backoffice', component: BackOfficeComponent},
    {
      path: 'backoffice/mecanicien',component: MecanicienComponent,
      children: [
        { path: '', component: DashboardComponent},
        { path: 'rendezvous', component: MecanicienRdv}
      ]
    },
    {
      path: 'backoffice/admin', component: AdminComponent,
      children: [
        { path: '', component: AdminDashboard},
        { path: 'mecanicien', component: mecano},
        { path: 'rendezvous', component: adminRendezVous}
      ]
    }];
