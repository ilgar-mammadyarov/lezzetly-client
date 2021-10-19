import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  placeholder = [];
  cartItems = new BehaviorSubject([])
  constructor() {
    const ls = this.getCartData()
    if (ls) {
      this.cartItems.next(ls);
    }
  }


  addItem(meal: any) {
    const ls = this.getCartData()
    let exist: any;
    if (ls) {
      exist = ls.find(item => {
        return item.id === meal.id
      });
    }
    if (exist) {
      exist.quantity++;
      this.setCartData(ls)
    } else {
      if (ls) {
        const newData = [...ls, meal]
        this.setCartData(newData)
        this.cartItems.next(this.getCartData())
      } else {
        this.placeholder.push(meal)
        this.setCartData(this.placeholder)
        this.cartItems.next(this.getCartData())
      }
      // this.placeholder.push(meal)
      // this.setCartData(this.placeholder)
      // this.cartItems.next(this.getCartData())
    }
  }
  setCartData(data) {
    localStorage.setItem('cart', JSON.stringify(data))
    this.cartItems.next(this.getCartData())
  }
  getCartData() {
    return JSON.parse(localStorage.getItem('cart'))
  }
}
