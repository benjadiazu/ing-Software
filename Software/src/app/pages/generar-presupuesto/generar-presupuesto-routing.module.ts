import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarPresupuestoPage } from './generar-presupuesto.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarPresupuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarPresupuestoPageRoutingModule {}
