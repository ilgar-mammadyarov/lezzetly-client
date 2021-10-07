import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMeal } from 'src/app/models/IMeal';
import { CookService } from 'src/app/services/cook.service';
import { MealsService } from 'src/app/services/meals.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cooks',
  templateUrl: './cooks.component.html',
  styleUrls: ['./cooks.component.scss']
})
export class CooksComponent implements OnInit {
  cook: any;
  meals: IMeal[];

  constructor(private cookService: CookService,
              private mealService: MealsService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCookById();
    this.getMealsByCookId();
  }
  getCookById() {
    this.cookService.getCookById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      response => {
        this.cook = response;
        console.log(this.cook)
      }
    )
  }

  //Check if it is working or not
  getMealsByCookId() {
    this.mealService.getMeals().subscribe(response => {
      this.meals = response.filter(item => item.cook.id == this.cook.id);
      //console.log(this.meals)
      //console.log(response[0].cook.id)
    })
  }

}
