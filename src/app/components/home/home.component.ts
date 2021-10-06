import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/services/meals.service';

import { Category, IMeal } from 'src/app/models/IMeal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: IMeal[];
  searchStr = '';
  categories: Category[];
  selectedCategory: any;
  constructor(private mealsService: MealsService) { }

  ngOnInit(): void {
    this.findMyLocation()
    this.getMeals()
    this.getMealCategories()
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
      .then(data => {console.log(data.locality)})

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
  //onSearch() and getMealsWithSelectedCategory() methods use the same mealsService method
  getMealsWithSelectedCategory(event) {
    this.mealsService.getSearchedMeal(event).subscribe(response => {
      this.meals = response
      //console.log(this.meals)
    })
    //console.log(event)
  }

  addToCart(id) {

  }
}
