import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category, IMeal, MealOption, Ingredient } from '../models/IMeal';

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
  getMealIngredients(): Observable<Ingredient[]> {
    return  this.http.get<Ingredient[]>(environment.baseUrl + 'ingredients')
  }

  deleteMeal(id) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.delete(environment.baseUrl + 'meals/' + id, {headers});
  }

  changeMealQuantity(id) {
    //return this.http.patch(environment.baseUrl + 'meals/' + id,)
  }


  postOrder(body) {
    return this.http.post(environment.baseUrl + 'order-create/', body);
  }
  //
  // getMealsWithSelectedCategory(selectedCategory) {
  //   return this.http.get(environment.baseUrl + 'meals/?search=' + selectedCategory)
  // }
}
