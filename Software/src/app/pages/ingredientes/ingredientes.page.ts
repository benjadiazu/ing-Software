import { Component, OnInit } from '@angular/core';
import { FoodPlanService } from 'src/app/services/food-plan.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.page.html',
  styleUrls: ['./ingredientes.page.scss'],
})
export class IngredientesPage implements OnInit {

  ingredients:{[ingredient: string]:number} = {};

  constructor(private foodPlanService: FoodPlanService) { }

  ngOnInit() {
    this.ingredients = this.foodPlanService.countRecipe();
  }

  getIngredientEntries() {
    return Object.entries(this.ingredients);
  }
}