import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleRecetasPageRoutingModule } from './detalle-recetas-routing.module';

import { DetalleRecetasPage } from './detalle-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleRecetasPageRoutingModule
  ],
  declarations: [DetalleRecetasPage]
})
export class DetalleRecetasPageModule {}
