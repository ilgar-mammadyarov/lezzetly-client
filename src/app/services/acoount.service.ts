import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AcoountService {

  private currentUserSource = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  user = {
    user_type: '',
    name: '',
    surname: '',
    mail: '',
    id: 0
  }


  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSource = new BehaviorSubject<any>(localStorage.getItem('token'));
        this.currentUser$ = this.currentUserSource.asObservable();
      if(localStorage.getItem('token')) {
        this.decodeTokenUserInfo(localStorage.getItem('token'))
      }

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

    return this.http.get(environment.baseUrl + 'user/', {headers});
  }

  loadUserByToken() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http.get(environment.baseUrl + 'user/', {headers});
  }


  login(values: any) {
    return this.http.post(environment.baseUrl + 'login/', values).pipe(
      map((user: any) => {
        if(user) {
          this.decodeTokenUserInfo(user.token);
          //console.log(this.user)
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }
  private decodeTokenUserInfo(token: any) {
    const decodedToken = this.helper.decodeToken(token);
    
    this.user.user_type = decodedToken.user_type;
    this.user.name = decodedToken.first_name;
    this.user.surname = decodedToken.last_name;
    this.user.mail = decodedToken.email;
    this.user.id = decodedToken.id;
    return this.user
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
    return this.http.put(environment.baseUrl + 'cooks/' + id, values, {headers})
    // .pipe(
    //   map((user: any) => {
    //     if(user) {
    //       console.log(user.token)
    //       localStorage.setItem('token', user.token);
    //       this.currentUserSource.next(user);
    //     }
    //   })
    // )
  } 

  updateCourierProfile(values: any, id: any, token: any) {
    //const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.put<any>(environment.baseUrl + 'couriers/' + id + '/', values, {headers})
    // .pipe(
    //   map((user: any) => {
    //     if(user) {
    //       console.log('test')
    //       console.log(user.token)
    //       localStorage.setItem('token', user.token);
    //       this.currentUserSource.next(user);
    //     }
    //   })
    // )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
