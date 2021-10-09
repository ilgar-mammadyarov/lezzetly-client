import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcoountService {

  private currentUserSource = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }


    //getCurrentUserValue() and loadCurrentUser() doesn't work
  // getCurrentUserValue() {
  //   return this.currentUserSource.value;
  // }

  // loadCurrentUser(token: string) {
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${token}`)

  //   return this.http.get(environment.baseUrl, {headers}).pipe(
  //     map((user: any) => {
  //       if(user) {
  //         localStorage.setItem('token', user.token)
  //         this.currentUserSource.next(user)
  //       }
  //     })
  //   )
  // }

  login(values: any) {
    return this.http.post(environment.baseUrl + 'login/', values).pipe(
      map((user: any) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values: any) {
    return this.http.post(environment.baseUrl + 'register/', values).pipe(
      map((user: any) => {
        if(user) {
          localStorage.setItem('token', user.token);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
