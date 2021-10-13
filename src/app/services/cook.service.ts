import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookService {
  private currentUserSource = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getCookById(id) {
    return this.http.get(environment.baseUrl + 'cooks/' + id)
  }

  addMeal(values, token) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.post(environment.baseUrl + 'meal-create/', values, {headers}).pipe(
      map((user: any) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }
}
