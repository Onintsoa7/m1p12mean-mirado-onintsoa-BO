import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';

@Component({
  selector: 'app-service',
  imports: [HeaderPagesComponent, FooterComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

}
