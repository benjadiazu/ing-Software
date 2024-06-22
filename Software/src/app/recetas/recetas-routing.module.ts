import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasPage } from './recetas.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasPage
  },
  {
    path: 'detalle-recetas/:day/:id',
    loadChildren: () => import('./detalle-recetas/detalle-recetas.module').then( m => m.DetalleRecetasPageModule)
  },
  {
    path: 'sustituir-receta/:day/:id/id',
    loadChildren: () => import('./sustituir-receta/sustituir-receta.module').then( m => m.SustituirRecetaPageModule)
  },
  {
    path: 'sustituir-receta/:day/:id',
    loadChildren: () => import('./sustituir-receta/sustituir-receta.module').then( m => m.SustituirRecetaPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasPageRoutingModule {}
