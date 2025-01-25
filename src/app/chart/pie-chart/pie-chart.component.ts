import { Component, ViewChild } from '@angular/core';
import { Statistics } from '../../app.component';
import { ApiService } from '../../service/api.service';
import   ApexCharts from 'apexcharts'
import {ApexNonAxisChartSeries, ApexResponsive,ApexChart  } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  data!:Statistics[];

  @ViewChild("chart") chartComponent:any;

  public chartOptions: Partial<ChartOptions> = {};

  constructor(private apiUrl: ApiService ) {

    this.chartOptions = {
      series: this.data.map(item => item.solved),
      chart: {
        width: 380,
        type: "pie"
      },

      labels: this.data.map(item => item.topic),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  ngOnInit(): void {
    this.apiUrl.getData('/problems-rating/admin/statistics-by-topic/').subscribe({

      next:(res: Statistics[]) => {
        this.data=res;
        console.log(this.data)
      },

      error:() =>{
        console.error("Xatolik yuz berdi")
      }

    });
  }

}
