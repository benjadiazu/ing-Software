import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SustituirRecetaPageRoutingModule } from './sustituir-receta-routing.module';

import { SustituirRecetaPage } from './sustituir-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SustituirRecetaPageRoutingModule
  ],
  declarations: [SustituirRecetaPage]
})
export class SustituirRecetaPageModule {}
