import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  
  constructor(private http: HttpClient) { }
 
  getMeals() {
    return this.http.get(environment.baseUrl + 'meals')
  }

  getSearchedMeal(searchStr) {
    return this.http.get(environment.baseUrl + 'meals/?search=' + searchStr);
  }
}
