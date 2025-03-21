import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxChartsModule, ScaleType, Color } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NgxChartsModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  months = [
    { name: 'Janvier', value: '01' },
    { name: 'Février', value: '02' },
    { name: 'Mars', value: '03' },
    { name: 'Avril', value: '04' },
    { name: 'Mai', value: '05' },
    { name: 'Juin', value: '06' },
    { name: 'Juillet', value: '07' },
    { name: 'Août', value: '08' },
    { name: 'Septembre', value: '09' },
    { name: 'Octobre', value: '10' },
    { name: 'Novembre', value: '11' },
    { name: 'Décembre', value: '12' }
  ];

  // Mois sélectionné (par défaut janvier)
  selectedMonth: string = '01';

  // Données de chiffre d'affaires pour chaque mois
  salesData: { [key: string]: { name: string; series: { name: string; value: number }[] }[] } = {
    '01': [
      {
        name: 'Chiffre d\'affaires',
        series: [
          { name: 'Semaine 1', value: 12000 },
          { name: 'Semaine 2', value: 15000 },
          { name: 'Semaine 3', value: 17000 },
          { name: 'Semaine 4', value: 20000 }
        ]
      }
    ],
    '02': [
      {
        name: 'Chiffre d\'affaires',
        series: [
          { name: 'Semaine 1', value: 10000 },
          { name: 'Semaine 2', value: 13000 },
          { name: 'Semaine 3', value: 16000 },
          { name: 'Semaine 4', value: 19000 }
        ]
      }
    ],
    // Ajoute d'autres mois ici...
  };

  // Configuration du graphique
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Semaine';
  showYAxisLabel = true;
  yAxisLabel = 'Chiffre d\'affaires (en €)';

  // Getter pour récupérer les données du mois sélectionné
  get filteredData() {
    return this.salesData[this.selectedMonth] || [];
  }

}
