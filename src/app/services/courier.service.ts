import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  constructor(private http: HttpClient) { }


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
    console.log(token)
    return this.http.post(environment.baseUrl + 'couriers/' + courierId + '/deliveryareas/', body)
  }
}
