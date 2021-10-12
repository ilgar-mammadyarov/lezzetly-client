import { Component, OnInit } from '@angular/core';
import { AcoountService } from 'src/app/services/acoount.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-cook-meals',
  templateUrl: './cook-meals.component.html',
  styleUrls: ['./cook-meals.component.scss']
})
export class CookMealsComponent implements OnInit {
  user: any = [];
  meals: any= [];
  cookId: any;
  constructor(private accountService: AcoountService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCurrentUser()
   // this.getCookMeals()
  }

  getCurrentUser() {
    const token = localStorage.getItem('token')

    if(token) {
      this.accountService.loadUser(token).subscribe(response => {
        this.user = response
        this.cookId = this.user.user.id;
        // console.log(this.user.user.id)
        // console.log(response)
        
      })
    }
  }

  getCookMeals() {
    this.dashboardService.getCookMeals(this.cookId).subscribe(response => {
      this.meals = response
      console.log(this.meals)
      //console.log(response)
      //console.log(this.meals)
    })
  }

  addMeal() {
    
  }
}
