import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegistroPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RegistroPage,
  ]
})
export class RegistroPageModule {}
