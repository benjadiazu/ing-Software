import { Recipe } from "src/interfaces/Recipe";

export class Day{
    food: Recipe[] = [];
    day:number = -1;
    month: number = -1;
    year:number = -1;
  
    constructor(){}
    setYear(year:number){this.year=year;}
    setMonth(month:number){this.month=month;}
    setDay(day:number){this.day = day;}
    setRecipe(recipe:Recipe){this.food.push(recipe);}
    getRecipe(idx:number){return this.food[idx];}
    addRecipe(recipe: Recipe){ this.food.push(recipe);}
    getSizeRecipes():number{ 
      if(this.food.length == 0) return 0;
      return this.food.length; 
    }
  }
  