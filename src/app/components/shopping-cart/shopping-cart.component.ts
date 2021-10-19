import { Component, OnInit } from '@angular/core';
import { IMeal } from 'src/app/models/IMeal';
import { CartService } from 'src/app/services/cart.service';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  meals: any;
  mealIds: any;
  uniqueMealIds = [];
  total: number;

  cartMeals: any[] = [];
  constructor(private cartService: CartService) {
   }

  ngOnInit(): void {
    //this.getMealIds()
    this.getCartMeals()
    // if( this.cartMeals){
    //   this.calculateTotal()
    // }
    
  }
  getCartMeals() {
    //this.cartMeals = JSON.parse(localStorage.getItem('cartMeals')) 
    // this.cartMeals = this.cartService.getCartData();
    this.cartService.cartItems.subscribe(response => {
      this.cartMeals = response;
      if(this.cartMeals) {
        this.calculateTotal(this.cartMeals)
      }
    })
  }
  // changeQuantity(id, quantity) {
  //   let changedMeals = JSON.parse(localStorage.getItem('cartMeals'))
  //   for(let i=0; i<changedMeals.length;i++) {
  //     if(changedMeals[i].id === id) {
  //       changedMeals[i].quantity = +quantity;
  //     }     
  //   }
  //   localStorage.removeItem('cartMeals');
  //   localStorage.setItem('cartMeals', JSON.stringify(changedMeals))
  //   window.location.reload();
  // }


  deleteCartMeal(i) {
    this.cartMeals.splice(i,1);
    this.cartService.setCartData(this.cartMeals)
    this.calculateTotal(this.cartMeals)
    // let changedMeals = JSON.parse(localStorage.getItem('cartMeals'))
    // for(let i=0; i<changedMeals.length;i++) {
    //   if(changedMeals[i].id === id) {
    //     console.log(changedMeals[i])
    //     changedMeals.splice(changedMeals[i],1)
        
    //   }     
    // }
    // localStorage.setItem('cartMeals', JSON.stringify(changedMeals))
    // window.location.reload();
    // console.log(changedMeals)
  }


  validateInput(i, event) {
    const quantity = +event.target.value;
    if(quantity < 1) {
      event.target.value = this.cartMeals[i].quantity;
      return;
    }
    this.quantityUpdated(quantity, i)
  }

  private quantityUpdated(qty, i) {
    this.cartMeals[i].quantity = qty

    this.cartService.setCartData(this.cartMeals)
    this.calculateTotal(this.cartMeals)
  }


  calculateTotal(data) {

    let subs = 0;

    for(const item of data){
      subs += item.price * item.quantity;
    }
    this.total = subs;
    //console.log(this.cartMeals)
    // for(let i=0; i<this.cartMeals.length; i++){
    //   this.total += this.cartMeals[i].quantity * this.cartMeals[i].price
    // }
    //console.log(total)
  }

}
