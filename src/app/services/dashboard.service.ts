import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getCookMeals(cookId) {
   // return this.http.get(environment.baseUrl + 'cooks/' + cookId + '/meals')
   return this.http.get(environment.baseUrl + 'cooks/' + cookId + '/meals');
  }

  addMeal() {
    
  }

}
