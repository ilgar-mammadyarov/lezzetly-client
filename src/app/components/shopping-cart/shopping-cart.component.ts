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
  constructor(private mealsService: MealsService) {
   }

  ngOnInit(): void {
    //this.getMealIds()
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
