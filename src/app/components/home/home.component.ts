import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/services/meals.service';

import { Category, IMeal, MealOption } from 'src/app/models/IMeal';
import { AcoountService } from 'src/app/services/acoount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: IMeal[];
  searchStr = '';
  categories: Category[];
  mealOptions: MealOption[];
  selectedCategory: any;
  selectedOption: any;
  cartItems = [];

  clientLocation: any;


  test: any;
  constructor(private mealsService: MealsService, private accountService: AcoountService) { }

  ngOnInit(): void {
    this.findMyLocation()
    this.getMeals()
    this.getMealCategories()
    this.getMealOptions()
  }

  findMyLocation() {
    if(!navigator.geolocation){
      console.log('Your device does not support NAVIGATION.')
    }
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longtitude = position.coords.longitude;


      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtitude}&localityLanguage=en`;

      fetch(geoApiUrl)
      .then(res => res.json())
      .then(data => {console.log(data)})

      // const key = 'AIzaSyAFgcBFhPugM2u4Q-2P3jKNGWuXsNpIrNg'
      // const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longtitude}&key=${key}`;
      // fetch(googleApi)
      // .then(res => res.json())
      // .then(data => {console.log(data)})

    });
    
  }

  getMeals() {
    this.mealsService.getMeals().subscribe(response => {
      this.meals = response
      console.log(this.meals)
    })
  }

  onSearch(searchStr:any) {
    this.mealsService.getSearchedMeal(searchStr).subscribe(response => {
      this.meals =response
      //console.log(this.meals)
    })
  }

  getMealCategories() {
    this.mealsService.getMealCategories().subscribe(response => {
      this.categories = response
      //console.log(this.categories)
    })
  }
  getMealOptions() {
    this.mealsService.getMealOptions().subscribe(response => {
      this.mealOptions = response
      //console.log(this.mealOptions)
    })
  }
  //onSearch() and getMealsWithSelectedCategory() methods use the same mealsService method
  getMealsWithSelectedCategory(event) {
    this.mealsService.getSearchedMeal(event).subscribe(response => {
      this.meals = response
      //console.log(this.meals)
    })
    //console.log(event)
  }

  getMealsWithSelectedOption(event) {
    this.mealsService.getSearchedMeal(event).subscribe(response => {
      this.meals = response
      //console.log(this.meals)
    })
    //console.log(event)
  }

  


  // addToCart(meal) {
  //   //this.cartItems.push(id);
  //   let cartItem = {
  //     id: meal.id,
  //     price: meal.price,
  //     title: meal.title,
  //     no: 1
  //   };
  //   if(localStorage.getItem('cartItems') === null) {
  //     this.cartItems.push(cartItem);
  //     localStorage.setItem('cartItems',JSON.stringify(this.cartItems))
  //   } else {
  //     const localItems = JSON.parse(localStorage.getItem('cartItems'));
  //     localItems.map(data => { 
  //       if(data.id === )
  //     })
  //   }
  //   console.log(this.cartItems)
  //  // localStorage.setItem('mealIds', JSON.stringify(this.cartItems))
  // //   localStorage.setItem('mealId', JSON.stringify(id));
  // //   console.log(id);
  // //   console.log(this.localStorageItems)
  // }

}
