import { Component, OnInit } from '@angular/core';
import { IMeal } from 'src/app/models/IMeal';
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
  total = 0;

  cartMeals: any;
  constructor() {
   }

  ngOnInit(): void {
    //this.getMealIds()
    this.getCartMeals()
    if( this.cartMeals){
      this.calculateTotal()
    }
    
  }
  getCartMeals() {
    this.cartMeals = JSON.parse(localStorage.getItem('cartMeals')) 
    //console.log(this.cartMeals)
  }
  changeQuantity(id, quantity) {
    let changedMeals = JSON.parse(localStorage.getItem('cartMeals'))
    for(let i=0; i<changedMeals.length;i++) {
      if(changedMeals[i].id === id) {
        changedMeals[i].quantity = +quantity;
      }     
    }
    localStorage.removeItem('cartMeals');
    localStorage.setItem('cartMeals', JSON.stringify(changedMeals))
    window.location.reload();
  }
  deleteCartMeal(id) {
    let changedMeals = JSON.parse(localStorage.getItem('cartMeals'))
    for(let i=0; i<changedMeals.length;i++) {
      if(changedMeals[i].id === id) {
        console.log(changedMeals[i])
        changedMeals.splice(changedMeals[i],1)
        
      }     
    }
    localStorage.setItem('cartMeals', JSON.stringify(changedMeals))
    window.location.reload();
    console.log(changedMeals)
  }

  calculateTotal() {
    //console.log(this.cartMeals)
    for(let i=0; i<this.cartMeals.length; i++){
      this.total += this.cartMeals[i].quantity * this.cartMeals[i].price
    }
    //console.log(total)
  }

  // getMealIds() {
  //   if(localStorage.getItem('mealIds') === null) {
  //     this.mealIds = []
  //   } else {
  //     this.mealIds = localStorage.getItem('mealIds');
  //     //Local storage returns string type and this filter turns it into array and finds unique ids
  //     //in this form --> "[" "1" "," "]" USE [1] To get the number
  //     this.uniqueMealIds = [...this.mealIds].filter((item, i, ar) => ar.indexOf(item) === i)
  //   }
  //   console.log(this.uniqueMealIds);
  //   console.log(this.mealIds);
  // }

  // getMeals() {
  //   this.mealsService.getMeals().subscribe(
  //     response => {this.meals = response}
  //   )
  //   console.log(this.meals)
  // }

}
