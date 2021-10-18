import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMeal } from 'src/app/models/IMeal';
import { CookService } from 'src/app/services/cook.service';
import { MealsService } from 'src/app/services/meals.service';
import { map } from 'rxjs/operators';
import { toUnicode } from 'punycode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cooks',
  templateUrl: './cooks.component.html',
  styleUrls: ['./cooks.component.scss']
})
export class CooksComponent implements OnInit {
  cook: any;
  meals: IMeal[] = [];


  //meals: any;
  cartMeals: any[] = [];
  // testMeals: any[] = [];
  cartMeal: any;

  constructor(private cookService: CookService,
    private mealService: MealsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getCookById();
    this.getMealsByCookId();
  }
  getCookById() {
    // this.cookService.getCookById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
    //   response => {
    //     this.cook = response;
    //     console.log(this.cook)
    //     console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    //   }
    // )

    console.log(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  //Check if it is working or not
  getMealsByCookId() {
    this.mealService.getMeals().subscribe(response => {
      // this.meals = response.filter(item => item.cook.id == this.cook.id);
      this.meals = response.filter(item => item.cook.id == +this.activatedRoute.snapshot.paramMap.get('id'));
      console.log(this.meals)
      //console.log(response[0].cook.id)
    })
  }


  addToCart(meal) {
    this.cartMeal = {
      id: meal.id,
      cookId: meal.cook.id,
      title: meal.title,
      price: meal.price,
      quantity: 1
    }
    if (JSON.parse(localStorage.getItem('cartMeals')) === null) {
      this.cartMeals.push(this.cartMeal)
      localStorage.setItem('cartMeals', JSON.stringify(this.cartMeals))
      window.location.reload();
      //this.toastr.success("Successfully Added!")
    } 
    else {
      
      const localItems = JSON.parse(localStorage.getItem('cartMeals'))
        for(let i=0; i<localItems.length; i++) {
          if(localItems[i].id == this.cartMeal.cookId) {
            return console.log('meals from different users!s')
          }
        }
      localItems.map(data => {
        if (data.id == this.cartMeal.id) {
          this.cartMeal.quantity = data.quantity + 1;
        } else {
          this.cartMeals.push(data)
        }
      })
      this.cartMeals.push(this.cartMeal)
      localStorage.setItem('cartMeals', JSON.stringify(this.cartMeals))
      window.location.reload();
      //this.toastr.success("Successfully Added!")
      //console.log(this.cartMeals)
    }
    //console.log(meal)
  }

}
