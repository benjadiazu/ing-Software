import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recetas',
    pathMatch: 'full'
  },
  {
    path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then( m => m.RecetasPageModule),
  },  {
    path: 'ingredientes',
    loadChildren: () => import('./ingredientes/ingredientes.module').then( m => m.IngredientesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
