import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookService {

  constructor(private http: HttpClient) { }

  getCookById(id) {
    return this.http.get(environment.baseUrl + 'cooks/' + id)
  }
}
