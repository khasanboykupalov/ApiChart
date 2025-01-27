import { ApiService } from './../../service/api.service';

import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { Statistics } from '../../app.component';
import {ApexNonAxisChartSeries, ApexResponsive,ApexChart, NgApexchartsModule  } from "ng-apexcharts";
import { ChartComponent } from "ng-apexcharts";



@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule,],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {

  data!:Statistics[];
  @ViewChild("chart") chart: any;
  public chartOptions: any;

  constructor(private apiService: ApiService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut"
      },
      labels: [],
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
    this.apiService.getData('/problems-rating/admin/statistics-by-topic/').subscribe({

      next:(res: Statistics[]) => {
        this.data=res;
        this.chartOptions

        this.chartOptions = {
          ...this.chartOptions,
          series: this.data?.map(item => item?.solved),
          labels: this.data?.map(item => item?.topic),
      
        };
        console.log(this.chartOptions, 'opts');
      },

      error:() =>{
        console.error("Xatolik yuz berdi")
      }

    });
  }
}
