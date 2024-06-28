import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';
import { Recipe } from 'src/interfaces/Recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-recetas',
  templateUrl: './detalle-recetas.page.html',
  styleUrls: ['./detalle-recetas.page.scss'],
})
export class DetalleRecetasPage implements OnInit {
  recipe:Recipe|undefined = undefined;
  currentId:string = '';

  constructor(private route: ActivatedRoute,
              private recipes: RecipeManagerService,
              private location: Location) { }

  goBack() {
    const previousUrl = this.location.back();
    console.log('Ruta anterior:', previousUrl);
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id'); // Convertir a número si es necesario
      if(recipeId == null){
        console.log("Ha habido un problema al redirigir");
        return;
      }
      this.recipe = this.recipes.getRecipe(recipeId);
      if(this.recipe == undefined){
        console.log("No se ha encontrado la receta")
        return
      }
      console.log("Se pudo encontrar la receta!");
      this.currentId = recipeId;
    });
  }
  ValidateRecipe():boolean{
    if(this.recipe==undefined){
      return false;
    }
    return true;
  }

  OnClickGoBack(){
    this.goBack();
  }
}