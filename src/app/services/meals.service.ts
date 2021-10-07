import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category, IMeal, MealOption } from '../models/IMeal';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  
  constructor(private http: HttpClient) { }
 
  getMeals(): Observable<IMeal[]> {
    return this.http.get<IMeal[]>(environment.baseUrl + 'meals')
  }

  getSearchedMeal(searchStr): Observable<IMeal[]> {
    return this.http.get<IMeal[]>(environment.baseUrl + 'meals/?search=' + searchStr);
  }
  //test this part
  getMealCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.baseUrl + 'categories')
  }

  getMealOptions(): Observable<MealOption[]> {
    return this.http.get<MealOption[]>(environment.baseUrl + 'mealoptions')
  }
  //
  // getMealsWithSelectedCategory(selectedCategory) {
  //   return this.http.get(environment.baseUrl + 'meals/?search=' + selectedCategory)
  // }
}
