import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Recipe } from 'src/interfaces/Recipe';
import { FoodPlanService } from 'src/app/services/food-plan.service';
import { RecipeManagerService } from 'src/app/services/recipe-manager.service';
import { Day } from 'src/classes/Day';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sustituir-receta',
  templateUrl: './sustituir-receta.page.html',
  styleUrls: ['./sustituir-receta.page.scss'],
})
export class SustituirRecetaPage implements OnInit {
  recipe:Recipe|undefined = undefined;
  recipeId: string | null = '';
  recipes:Recipe[] = [];
  day:string | null ='';
  constructor(private route:ActivatedRoute,
              private router:Router,
              private foodPlanService: FoodPlanService,
              private recipeManager: RecipeManagerService,
              private location: Location,
              private alertController: AlertController) { }

  ngOnInit() {
    this.foodPlanService.getObservableFoodPlan();
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id');
      const recipeDay = params.get('day');
      this.day = recipeDay;
      this.recipeId = recipeId;
      if(recipeId == null){
        console.log("Ha habido un problema al redirigir");
        return;
      }
      console.log(this.day);
      console.log(this.recipeId);
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
        id:"receta_de_reemplazo_n_"+String(i),
        name:"receta_de_reemplazo_n_"+String(i),
        description:"receta sustituta",
        ingredients:["1","2"],
        steps:["1","2","3"],
        img:"assets/img/pollo-curry-manzana.jpg"
      })
    }
  }

  OnClickWatchRecipe(recipe:Recipe){
    this.router.navigate(['./recetas/detalle-recetas', this.day ,recipe.id]);
  }

  ReplaceRecipe(idRecipe:string){

    if(this.day==null){
      console.log("error al cargar el día");
      return
    }
    let day_aux: Day|null = this.foodPlanService.getDay(this.day);
    if(day_aux == null){
      console.log("No se pudo encontrar el dia");
      return
    }
    let recipe_to_sustitute:Recipe| undefined = this.recipeManager.getRecipe(idRecipe);
    if(recipe_to_sustitute == undefined){
      console.log("Error al usar el servicio");
      return
    }
    if(this.recipe==undefined){
      console.log("Error en los datos");
      return
    }
    if(day_aux.replaceRecipe(this.recipe?.id, recipe_to_sustitute) && day_aux!=undefined){
      this.foodPlanService.replaceDay(this.day, day_aux);
      /*
      this.recipes = day_aux.getRecipes();
      this.recipeId = idRecipe;
      this.recipe = day_aux.getRecipeById(this.recipe);
      console.log("Se reeemplazo la receta");
      */
      this.OnClickGoBack();
    }else{
      console.log("No se pudo reemplazar");
    }
  }

  goBack() {
    const previousUrl = this.location.back();
    console.log('Ruta anterior:', previousUrl);
  }

  async OnClickReplaceRecipe(event:Event,id:string) {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: '¿Esta seguro de reemplazar la receta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          role: 'si',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role === 'si'){
      this.ReplaceRecipe(id);
    }
  }
}