import { Component, ViewChild }  from '@angular/core';
import { RouterLink, } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { Statistics } from '../chart.interface';


import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexDataLabels, ApexStroke, ApexYAxis, ApexXAxis, ApexPlotOptions, ApexTooltip, NgApexchartsModule} from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
  imports: [NgApexchartsModule,  RouterLink],
})
export class BarChartComponent {

  @ViewChild("chart") chart : any;
  public chartOptions:any;

constructor(private apiService:ApiService,) {}

  ngOnInit(): void {

    this.apiService.getStatistics<Statistics[]>().subscribe({
      next:(response) => {
        console.log(response)

        this.chartOptions = {

          series: [
            {
              data:response.map(item => item.solved)

            }
          ],
          chart: {
            type: "bar",
            height: 380,
            toolbar:{
              show:false
            }
          },
          plotOptions: {
            bar: {
              barHeight: "100%",
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: "bottom"
              }
            }
          },
          colors: [
            "#142459",
            "#176BA0",
            "#19AADE",
            "#1AC9E6",
            "#DB4CB2",
            "#1AE6A1",
            "#775DD0",
            "#B04BCF",
            "#BE2323",
            "#FF4560",
            "#0EC898",
            "#1DE5BC"

          ],
          dataLabels: {
            enabled: false,
            textAnchor: "start",
            style: {
              colors: ["#ffffff"]
            },
            formatter: function(val:any, opt:any) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
            },
            offsetX: 0,
            dropShadow: {
              enabled: true
            }
          },
          stroke: {
            width: 1,
            colors: ["#fff"]
          },
          xaxis: {
            categories: response.map(item => item.topic)
          },
          yaxis: {
            labels: {
              show: false
            },
      
          },
          title: {
            text: "DataLabels",
            align: "center",
            floating: true
          },
          subtitle: {
            text: "Problems statistics by topic",
            align: "center"
          },
          tooltip: {
            theme: "dark",
            x: {
              show: false
            },
            y: {
              title: {
                formatter: function() {
                  return "";
                }
              }
            }
          }
          
        };

      },
      error:() => {
        console.log("Qandaydir Xato Yuz berdi")
      }
    })

  }

}


