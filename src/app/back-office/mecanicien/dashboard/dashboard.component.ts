import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NgxEchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  carsProcessed = [3, 5, 2, 8, 6, 7, 4];

  get chartOptions() {
    return {
      title: {
        text: 'Statistiques des voitures traitées'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.daysOfWeek,
        name: 'Jour'
      },
      yAxis: {
        type: 'value',
        name: 'Voitures traitées'
      },
      series: [
        {
          name: 'Voitures traitées',
          data: this.carsProcessed,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#5AA454'
          },
          itemStyle: {
            color: '#5AA454'
          }
        }
      ]
    };
  }
}
