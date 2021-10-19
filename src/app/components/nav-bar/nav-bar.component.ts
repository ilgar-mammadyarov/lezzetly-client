import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AcoountService } from 'src/app/services/acoount.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<any>;
  userInfo;
  itemsInCart: any;
  //cartItemCount = 0;
  constructor(private accountService: AcoountService, 
    private router: Router,
    private cartService: CartService ) { 
    // this.cartItemCount = JSON.parse(localStorage.getItem('cartItems'))
    // console.log(this.cartItemCount)
    // console.log(JSON.parse(localStorage.getItem('cartItems')))
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
    this.userInfo = this.accountService.user;
    this.cartService.cartItems.subscribe(data => {
      this.itemsInCart = data.length;
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
