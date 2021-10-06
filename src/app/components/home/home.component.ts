import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: any = [];
  searchStr = '';
  constructor(private mealsService: MealsService) { }

  ngOnInit(): void {
    this.findMyLocation()
    this.getMeals()
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
      console.log(this.meals)
    })
  }
}
