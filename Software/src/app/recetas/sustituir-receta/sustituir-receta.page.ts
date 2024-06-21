import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Recipe } from 'src/interfaces/Recipe';
import { FoodPlanService } from 'src/services/food-plan.service';

@Component({
  selector: 'app-sustituir-receta',
  templateUrl: './sustituir-receta.page.html',
  styleUrls: ['./sustituir-receta.page.scss'],
})
export class SustituirRecetaPage implements OnInit {
  recipe:Recipe|undefined = undefined;
  recipes:Recipe[] = [];
  constructor(private route:ActivatedRoute,
              private router:Router,
              private foodPlanService: FoodPlanService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id'); // Convertir a número si es necesario
      if(recipeId == null){
        console.log("Ha habido un problema al redirigir");
        return;
      }
      this.recipe = this.foodPlanService.getRecipeById(recipeId); 
      if(this.recipe == undefined){
        console.log("No se ha encontrado la receta")
        return
      }
      console.log("Se pudo encontrar la receta!");
    });
    this.searchOnDataBase();
  }

  OnClickGoBack(){
    this.router.navigate(['/recetas']);
  }

  searchOnDataBase(){
    //Cambiar la lógica para cargar los datos
    //Aplicar criterio:
    // 1.Valor del plato (No debe superar al actual)
    // 2.Tipo de comida (Desayuno, colación, almuerzo, etc.)
    for(let i:number = 0; i < 5; i++){
      this.recipes.push({
        id:"receta_de_reemplazo_n:"+String(i),
        nombre:"receta_de_reemplazo_n:"+String(i),
        descripcion:"receta sustituta",
        ingredientes:["1","2"],
        pasos:["1","2","3"],
        img:"assets/img/pollo-curry-manzana.jpg"
      })
    }
  }

  OnClickWatchRecipe(recipe:Recipe){
    this.router.navigate(['./recetas/detalle-recetas', recipe.id]);
  }
}
