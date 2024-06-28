import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarPresupuestoPageRoutingModule } from './generar-presupuesto-routing.module';

import { GenerarPresupuestoPage } from './generar-presupuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarPresupuestoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GenerarPresupuestoPage]
})
export class GenerarPresupuestoPageModule {}
