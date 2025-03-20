import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxChartsModule, ScaleType, Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Time
  };

  // ✅ Données formatées correctement pour un Line Chart
  data: { name: string; series: { name: string; value: number }[] }[] = [
    {
      name: 'Voitures traitées',
      series: [
        { name: 'Lundi', value: 3 },
        { name: 'Mardi', value: 5 },
        { name: 'Mercredi', value: 2 },
        { name: 'Jeudi', value: 8 },
        { name: 'Vendredi', value: 6 },
        { name: 'Samedi', value: 7 },
        { name: 'Dimanche', value: 4 }
      ]
    }
  ];

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Jour';
  showYAxisLabel = true;
  yAxisLabel = 'Voitures traitées';
}
