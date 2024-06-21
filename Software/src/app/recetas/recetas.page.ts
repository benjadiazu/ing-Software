import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FoodPlanService } from 'src/services/food-plan.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/interfaces/Recipe';
import { Day } from 'src/classes/Day';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recipes:Recipe[] = []
  mostrar_recetas:boolean = true;
  day:string = '';
  time:number = 2000;

  constructor(private loadingController: LoadingController, 
              private alertController: AlertController,
              public foodPlanService: FoodPlanService,
              private router:Router ){ }
  ngOnInit() {
    const savedDay = sessionStorage.getItem('selectedDay');
    if (savedDay) {
      this.day = savedDay;
      this.load_data(this.day, false);
    }
  }

  async search_recipe(day:string){
    if (!day || day.trim().length === 0) {
      const alert = await this.alertController.create({
        header: 'Tal parece que la información no es correcta :(',
        message: 'Verifica que ingresarás un dato y que sea un número.',
        buttons: ['Okey'],
      });
      await alert.present();
      return; 
    }else{
      this.load_data(day);
      return;
    }
  }

  async load_data(day:string, showLoading: boolean = true){
    //HACER BUSQUEDA POR DIA DEL ITINERARIO
    if(showLoading){
      const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: this.time
      });
      await loading.present();
  
      setTimeout(() => {
        loading.dismiss();
        this.mostrar_recetas = !this.mostrar_recetas;
      }, this.time);
    }else{
      this.mostrar_recetas = false;
    }
    
    let aux_day:Day|null = this.foodPlanService.getDay(day);
    if(aux_day != null){
      for(let i:number = 0; i < aux_day.getSizeRecipes() ; i++){
        this.recipes.push(aux_day.getRecipe(i));
      }
    }else{
      console.log("no se pudo encontrar información sobre ese día");
    }
  }

  clean_list(){
    this.recipes = []
  }

  restaure_page(){
    this.day='';
    this.mostrar_recetas=true;
    this.recipes=[];
    sessionStorage.removeItem('selectedDay');
  }

  watchRecipe(recipe:Recipe){
    this.router.navigate(['./recetas/detalle-recetas', recipe.id]);
  }
}
