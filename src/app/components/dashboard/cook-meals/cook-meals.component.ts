import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcoountService } from 'src/app/services/acoount.service';
import { CookService } from 'src/app/services/cook.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MealsService } from 'src/app/services/meals.service';
import { Category, IMeal, MealOption, Ingredient } from '../../../models/IMeal';
@Component({
  selector: 'app-cook-meals',
  templateUrl: './cook-meals.component.html',
  styleUrls: ['./cook-meals.component.scss']
})
export class CookMealsComponent implements OnInit {
  user: any = [];
  meals: any= [];
  cookId: any;
  errorMsg: any;
  deleteErrMsg: any;

  addMealForm: FormGroup;

  categories: Category[];
  mealoptions: MealOption[];
  ingredients: Ingredient[];


  constructor(private accountService: AcoountService, 
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private mealService: MealsService,
    private cookService: CookService
    ) { }

  ngOnInit(): void {
    this.getCurrentUser()
    //this.getCookMeals()
    this.createAddMealForm()

    this.getMealCategories()
    this.getMealOptions()
    this.getMealIngredients()
  }

  createAddMealForm() {
    this.addMealForm = this.fb.group({
      title: [null, Validators.required],
      price: [null, Validators.required],
      stock_quantity: [null, Validators.required],
      is_active: [null, Validators.required],
      category: [null, Validators.required],
      ingredients: [null, Validators.required],
      mealoption: [null, Validators.required],
    })
  }

  getCurrentUser() {
    const token = localStorage.getItem('token')

    if(token) {
      this.accountService.loadUser(token).subscribe(response => {
        this.user = response
        this.cookId = this.user.user.id;
        console.log(this.user.user.id)
        // console.log(response)
        
      })
    }
  }

  getCookMeals() {
    this.dashboardService.getCookMeals(this.cookId).subscribe(response => {
      this.meals = response
      //console.log(this.meals)
      console.log(response)
      //console.log(this.meals)
    }, error => {
      console.log(error)
    })
  }

  getMealCategories() {
    this.mealService.getMealCategories().subscribe(response => {
      this.categories = response;
      //console.log(this.categories)
    })  
  }
  getMealIngredients() {
    this.mealService.getMealIngredients().subscribe(response => {
      this.ingredients = response;
      //console.log(this.ingredients)
    })
  }
  getMealOptions() {
    this.mealService.getMealOptions().subscribe(response => {
      this.mealoptions = response;
     // console.log(this.mealoptions)
    })
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    //console.log(this.addMealForm.value)
    this.cookService.addMeal(this.addMealForm.value, token).subscribe(response => {
      console.log(response)
    },error => {
      //console.log(error)
      this.errorMsg = error.error.message
    })
  }

  deleteMeal(id) {
    this.mealService.deleteMeal(id).subscribe(response => {
      console.log(response)
      this.getCookMeals()
    },error => {
      console.log(error)
      // this.deleteErrMsg = error.error.message
      // console.log(this.deleteErrMsg)
    })
  }
  changeQuantity(id, quantity) {
    this.cookService.changeQuantuty(id, quantity).subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
}
