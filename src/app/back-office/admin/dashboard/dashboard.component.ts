import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NgxEchartsModule,
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

  selectedMonth: string = '01';

  salesData: { [key: string]: number[] } = {
    '01': [12000, 15000, 17000, 20000],
    '02': [10000, 13000, 16000, 19000]
    // Ajoute plus de mois ici si besoin
  };

  get chartOptions() {
    const data = this.salesData[this.selectedMonth] || [];
    return {
      title: {
        text: `Chiffre d'affaires - Mois sélectionné`
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4']
      },
      yAxis: {
        type: 'value',
        name: 'Chiffre d\'affaires (€)'
      },
      series: [
        {
          data: data,
          type: 'line',
          smooth: true
        }
      ]
    };
  }
}
