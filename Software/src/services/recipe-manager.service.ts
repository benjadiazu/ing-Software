import { Injectable } from '@angular/core';
import { Recipe } from 'src/interfaces/Recipe';

//Borrar esto cuando se importe desde la API los datos
import { Day } from 'src/classes/Day';

@Injectable({
  providedIn: 'root'
})
export class RecipeManagerService {
  private recipes:Recipe[] = []
  constructor() { 
    this.loadData();
  }

  getRecipe(id:string): Recipe | undefined{
    for(let i:number = 0; i < this.recipes.length ; i++){
      if(this.recipes[i].id == id){
        return this.recipes[i];
      }
    }
    return undefined;
  }

  loadData(){
    this.addData();
    this.searchOnDataBase();
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
          ingredientes:["1. Leiste esto?","2. Ahora leiste?","3. Seguiste leyendo???"],
          pasos:["asasjdghaklsdghioad aslñidhaoskldnalñkdblkasdladkla askjdhalksjdghoaisdliuasdikljbaidfjb",
            "aolsdhjasdjnpasd saldkhjaioed09pq3wepoiaksnoekd, aopsdhoalhdfiopwp9uidifd",
            "diopasudhopqwagery, sopdiqa90wpe0p9 892qwbug sueg8dwajhfe7 i 3wiu yuy 2fv"],
          img: "assets/img/pollo-curry-manzana.jpg"
        };
        counter+=1;
        aux.addRecipe(recipe);
        this.recipes.push(recipe);
      }
    }
  }

  searchOnDataBase(){
    //Cambiar la lógica para cargar los datos
    //Aplicar criterio:
    // 1.Valor del plato (No debe superar al actual)
    // 2.Tipo de comida (Desayuno, colación, almuerzo, etc.)
    for(let i:number = 0; i < 5; i++){
      this.recipes.push({
        id:"receta_de_reemplazo_n_"+String(i),
        nombre:"receta_de_reemplazo_n_"+String(i),
        descripcion:"receta sustituta",
        ingredientes:["1","2"],
        pasos:["1","2","3"],
        img:"assets/img/pollo-curry-manzana.jpg"
      })
    }
  }
}
