import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcoountService {

  private currentUserSource = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSource = new BehaviorSubject<any>(localStorage.getItem('token'));
        this.currentUser$ = this.currentUserSource.asObservable();
   }


    //getCurrentUserValue() and loadCurrentUser() doesn't work
  // getCurrentUserValue() {
  //   return this.currentUserSource.value;
  // }

  // loadCurrentUser(token: string) {

  //   if(token === null) {
  //     this.currentUserSource.next(null);
  //     return;
  //   }
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${token}`)

  //   return this.http.get(environment.baseUrl + 'user', {headers}).pipe(
  //     map((user: any) => {
  //       if(user) {
  //         localStorage.setItem('token', user.token)
  //         this.currentUserSource.next(user)
  //       }
  //     })
  //   )
  // }


  loadUser(token: string) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http.get(environment.baseUrl + 'user', {headers});
  }

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

  updateCookProfile(values: any, id: any, token: any) {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.put(environment.baseUrl + 'cooks/' + id, values, {headers}).pipe(
      map((user: any) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
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
