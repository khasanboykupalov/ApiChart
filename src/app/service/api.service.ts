import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Statistics } from '../app.component';





@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getData(url: string): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(this.apiUrl + url)
  }

}
