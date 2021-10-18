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
    //const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.post<any>(environment.baseUrl + 'meal-create/', values, {headers})
    //.pipe(
    //   map((user: any) => {
    //     if(user) {
    //       localStorage.setItem('token', user.token);
    //       this.currentUserSource.next(user);
    //     }
    //   })
    // )
  }

  changeQuantuty(id, quantity) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    let body = {
      "stock_quantity": quantity
    }
    return this.http.patch<any>(environment.baseUrl + 'meals/' + id + '/', body,{headers})
  }

  rejectOrder(orderId, body) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    
    return this.http.patch<any>(environment.baseUrl + 'reject-order/' + orderId + '/', body,{headers})
  }

  getCookRecommendationById(cookId) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get(environment.baseUrl + 'cooks/' + cookId + '/recommendations/', {headers});
  }

  postRecommendationByCookId(cookId, body) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.post(environment.baseUrl + 'cooks/' + cookId + '/recommendations/', body, {headers})
  }

  getCookResumeById(cookId) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get(environment.baseUrl + 'cooks/' + cookId + '/resumes/', {headers});
  }

  postResumeByCookId(cookId, body) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.post(environment.baseUrl + 'cooks/' + cookId + '/resumes/', body, {headers})
  }
}
