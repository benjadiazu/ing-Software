import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleRecetasPage } from './detalle-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleRecetasPageRoutingModule {}
