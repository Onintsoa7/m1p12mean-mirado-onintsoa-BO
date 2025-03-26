import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticComponent } from "./diagnostic/diagnostic.component";
import { EntretienComponent } from "./entretien/entretien.component";
import { ReparationComponent } from "./reparation/reparation.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  imports: [HeaderPagesComponent, FooterComponent, DiagnosticComponent, EntretienComponent, ReparationComponent, CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  serviceId: string | null = null;
  constructor(private route: ActivatedRoute) {}

  getServicesDetails() {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
    });   
  }
  ngOnInit() {
    this.getServicesDetails();
  }

}
