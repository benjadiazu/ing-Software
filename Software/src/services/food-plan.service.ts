import { Injectable } from '@angular/core';
import { FoodPlan } from 'src/classes/FoodPlan';
import { Day } from 'src/classes/Day';
import { Recipe } from 'src/interfaces/Recipe';

@Injectable({
  providedIn: 'root'
})
export class FoodPlanService {
  private foodplan:FoodPlan = new FoodPlan();
  private allRecipes:Recipe[] = [];

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
    let counter:number = 0;
    for(let i:number = 0; i < 5; i++){
      let aux:Day=new Day();
      
      for(let k:number = 0; k < 5; k++){
        let recipe:Recipe = {
          id:String(counter),
          nombre:"Nombre receta",
          descripcion: "descripción breve de la receta",
          ingredientes:["1. Leiste esto?","2. Ahora me la chupan","3. Seguiste leyendo, me la vuelves a chupar..."],
          pasos:["asasjdghaklsdghioad aslñidhaoskldnalñkdblkasdladkla askjdhalksjdghoaisdliuasdikljbaidfjb",
            "aolsdhjasdjnpasd saldkhjaioed09pq3wepoiaksnoekd, aopsdhoalhdfiopwp9uidifd",
            "diopasudhopqwagery, sopdiqa90wpe0p9 892qwbug sueg8dwajhfe7 i 3wiu yuy 2fv"],
          img: "assets/img/pollo-curry-manzana.jpg"
        };
        counter+=1;
        aux.addRecipe(recipe);
        this.allRecipes.push(recipe);
      }
      aux.setDay(i);
      aux.setMonth(6);
      aux.setYear(2024);

      this.foodplan.addDay(aux);
      
      console.log(this.foodplan.getSizeRecipes(i));
    }
  }

  getRecipeById(id:string):Recipe | undefined{
    let recipe:Recipe|undefined = this.allRecipes.find(recipe => recipe.id == id);
    return recipe || undefined;
  }
}
