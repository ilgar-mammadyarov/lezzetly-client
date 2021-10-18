import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AcoountService } from './acoount.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  userId: any;
  constructor(private http: HttpClient,
    private accountService: AcoountService) {
      this.userId = accountService.user.id
     }

  getCookMeals(cookId) {
   // return this.http.get(environment.baseUrl + 'cooks/' + cookId + '/meals')
   return this.http.get(environment.baseUrl + 'cooks/' + cookId + '/meals');
  }

  //Here will change
  getCookActiveOrders(id) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(environment.baseUrl + 'cooks/' + id + '/orders/', {headers})
  }

  getCourierActiveOrders(id) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get(environment.baseUrl + 'couriers/' + id + '/activeorders/', {headers})
  }
  getCourierOrders(id) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get(environment.baseUrl + 'couriers/' + id + '/orders/', {headers})
  }

  getCourierDeliveryAreasById(id) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get(environment.baseUrl + 'couriers/' + id + '/deliveryareas/', {headers})
  }

  postDeliveryArea(courierId, body) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    //console.log(token)
    return this.http.post<any>(environment.baseUrl + 'couriers/' + courierId + '/deliveryareas/', body, {headers})
  }


  getCouriers() {
    return this.http.get(environment.baseUrl + 'couriers/');
  }

  getCouriersWithAreas() {
    return this.http.get(environment.baseUrl + 'couriers/deliveryareas');
  }

  getCourierDeliveryAreas(id) {
    return this.http.get(environment.baseUrl + 'couriers/' + id + '/deliveryareas');
  }

  getDeliveryAreas() {
    return this.http.get(environment.baseUrl + 'deliveryareas/');
  }

  addCourier(orderId, courierId) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.patch<any>(environment.baseUrl + 'add-courier/' + orderId, courierId, {headers})
  }

}
