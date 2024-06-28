import { Component, OnInit } from '@angular/core';
import { FormError, mensajesErr} from 'src/app/componentes/form-errors';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

interface CustomErrorMessages {
  [key: string]: {
    [errorType: string]: string;
  };
}

@Component({
  selector: 'app-generar-presupuesto',
  templateUrl: './generar-presupuesto.page.html',
  styleUrls: ['./generar-presupuesto.page.scss'],
})
export class GenerarPresupuestoPage implements OnInit {
  formulario:FormGroup;
  mensaje:String="";
  errorMessage: string = '';

  customMessages: CustomErrorMessages = {
    monto: {
      min: 'El monto mínimo es de $10.000',
      max: 'El monto máximo es de $100.000'
    }
  };

  constructor(private form:FormBuilder, private router:Router) { 
    this.formulario = this.form.group({
      monto: ['', [Validators.required, Validators.min(10000),Validators.max(100000)]],
    });
  }

  ngOnInit() {
  }

  formError(campo: string): string | null {
    const control = this.formulario.get(campo);
    if (control && control.errors) {
      const error: FormError = Object.keys(control.errors)[0] as FormError;
      return this.getErrorMessage(campo, error);
    }
    return null;
  }

  getErrorMessage(campo: string, error: FormError): string {
    if (this.customMessages[campo] && this.customMessages[campo][error]) {
      return this.customMessages[campo][error];
    }
    return mensajesErr[error];
  }

  onSubmit() {
    console.log('Monto enviado:', this.formulario.value);
  }

}
