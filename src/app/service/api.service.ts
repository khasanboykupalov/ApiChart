import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl ='https://kep.uz/api/problems-rating/admin/statistics-by-topic/'

  constructor(private http: HttpClient) { }

  getStatistics<T>(): Observable<T> {
    return this.http.get<T>(this.apiUrl)
  }

}
