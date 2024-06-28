import { Injectable } from '@angular/core';
import { FoodPlan } from 'src/classes/FoodPlan';
import { Day } from 'src/classes/Day';
import { Recipe } from 'src/interfaces/Recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodPlanService {
  private foodplan:FoodPlan = new FoodPlan();
  private allRecipes:Recipe[] = [];
  private _foodplan:BehaviorSubject<FoodPlan> = new BehaviorSubject<FoodPlan>(this.foodplan);

  constructor() {
    //Ajustar el método
    this.addData();
  }

  getDay(day:string): Day | null{
    return this.foodplan.getDay(day);
  }

  getSizeRecipes(idx:number):number{
    return this.foodplan.getSizeRecipes(idx);
  }

  getObservableFoodPlan(){
    return this._foodplan.asObservable();
  } 

  updateRecipes(){
    this.allRecipes = []
    for(let i = 0; i < this.foodplan.getSize(); i++){
      let aux:Day|null = this.foodplan.getDayByIdx(i);
      if(aux != null){
        for(let k = 0; k < aux.getSizeRecipes() ;k++){
          this.allRecipes.push(aux.getRecipe(k));
        }
      }
    }
  }

  replaceDay(date:string, day:Day): boolean{
    if(this.foodplan.replaceDay(date, day)){
      this.updateRecipes();
      this._foodplan.next(this.foodplan);
      return true;
    }
    this._foodplan.next(this.foodplan);
    return false;
  }

  addData(){
    let counter:number = 0;
    for(let i:number = 0; i < 5; i++){
      let aux:Day=new Day();
      
      for(let k:number = 0; k < 5; k++){
        let recipe:Recipe = {
          id:String(counter),
          name:"Nombre receta",
          description: "descripción breve de la receta",
          ingredients:["1. Leiste esto?","2. Ahora leiste?","3. Seguiste leyendo???"],
          steps:["asasjdghaklsdghioad aslñidhaoskldnalñkdblkasdladkla askjdhalksjdghoaisdliuasdikljbaidfjb",
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
      this._foodplan.next(this.foodplan);
    }
  }

  getRecipeById(id:string):Recipe | undefined{
    let recipe:Recipe|undefined = this.allRecipes.find(recipe => recipe.id == id);
    return recipe || undefined;
  }

  mostrar_recetas(){
    this.foodplan.mostrar_recetas();
  }

  countRecipe():{[ingredient:string]:number}{
    let ingredientCount: { [ingredient: string]: number } = {};

    for(let recipe of this.allRecipes){
      for(let ing of recipe.ingredients){
        if (ingredientCount[ing]) {
          ingredientCount[ing]++;
        } else {
          ingredientCount[ing] = 1;
        }
      }
    }
    return ingredientCount;
  }
}