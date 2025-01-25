import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';


  export  interface Statistics {
    id:number;
    topic:string;
    code:string;
    solved:number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {
  title = 'ApiChart';

  data!:Statistics[];
  
  constructor(private apiUrl: ApiService ) {}

  // ngOnInit(): void {
  //   this.apiUrl.getData('/problems-rating/admin/statistics-by-topic/').subscribe({

  //     next:(res: Statistics[]) => {
  //       this.data=res;
  //       console.log(this.data)
  //     },

  //     error:() =>{
  //       console.error("Xatolik yuz berdi")
  //     }

  //   })
  // }
}
