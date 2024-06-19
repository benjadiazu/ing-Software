import { Injectable } from '@angular/core';

export interface Recipe{
  nombre:string,
  descripcion:string,
  ingredientes:string[],
  pasos:string[],
  img:string
}

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

const regex = /[\/\-.]/;

class FoodPlan{
  
  days:Day[] = [];

  constructor(){}

  addDay(day:Day){
    this.days.push(day);
  }

  getSizeRecipes(idx:number){
    return this.days[idx].getSizeRecipes();
  }

  getDay(date:string):Day | null{
    let val:string[] = date.split(regex);
    let day:number = Number(val[0]);
    let month: number = Number(val[1]);
    let year:number = Number(val[2]);

    for(let i = 0; i < this.days.length; i++){
      if(this.days[i].day == day){
        return this.days[i];
      }
    };
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FoodPlanService {
  foodplan:FoodPlan = new FoodPlan();

  constructor() {
    console.log("entra al servicio")
    this.addData();
  }

  getDay(day:string): Day | null{
    return this.foodplan.getDay(day);
  }

  getSizeRecipes(idx:number):number{
    return this.foodplan.getSizeRecipes(idx);
  }

  addData(){

    for(let i:number = 0; i < 5; i++){
      let aux:Day=new Day();
      
      for(let k:number = 0; k < 5; k++){
        let recipe:Recipe = {
          nombre:"recipe ${{k}} of day ${{i+5}}",
          descripcion: "...",
          ingredientes:["1","2","3"],
          pasos:["as","fd","fv"],
          img: "assets/img/pollo-curry-manzana.jpg"
        };
        
        aux.setRecipe(recipe);
      }
      aux.setDay(i);
      aux.setMonth(6);
      aux.setYear(2024);

      this.foodplan.addDay(aux);
      console.log(this.foodplan.getSizeRecipes(i));
    }
  }
}
