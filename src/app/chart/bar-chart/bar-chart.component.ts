import { Component, ViewChild, ChangeDetectorRef }  from '@angular/core';
import  ApexCharts  from 'apexcharts'
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip, NgApexchartsModule} from "ng-apexcharts";
import { Statistics } from '../../app.component';
import { ApiService } from '../../service/api.service';
import { RouterModule } from '@angular/router';

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
  imports: [NgApexchartsModule,  RouterModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  data!:Statistics[];
  @ViewChild("chart") chart : any;
  public chartOptions:any;

constructor(private apiService:ApiService,) {}

  ngOnInit(): void {

    this.apiService.getData('/problems-rating/admin/statistics-by-topic/').subscribe({
      next:(res: Statistics[]) => {
        this.data=res;
        console.log(this.data)

        this.chartOptions = {

          series: [
            {
              data:this.data.map(item => item.solved)
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
            categories: this.data.map(item => item.topic)
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


