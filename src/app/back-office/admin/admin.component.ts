import { Component } from '@angular/core';
import { SidebarAdminComponent } from "../sidebar-admin/sidebar-admin.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,SidebarAdminComponent, HeaderComponent, FooterComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
