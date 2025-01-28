import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';


import { ApiService } from './../../service/api.service';
import { Statistics } from '../chart.interface';

import { NgApexchartsModule } from "ng-apexcharts";

// Bu usulda ishlash tavsiya etiladi

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule, RouterLink],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {


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
    this.apiService.getStatistics<Statistics[]>().subscribe({

      next: (response) => {
        this.chartOptions

        this.chartOptions = {
          ...this.chartOptions,
          series: response.map(item => item.solved),
          labels: response.map(item => item.topic),

        };
        console.log(this.chartOptions, 'opts');
      },

      error: () => {
        console.error("Xatolik yuz berdi")
      }

    });
  }
}

