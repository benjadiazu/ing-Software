import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FormError, mensajesErr } from 'src/app/componentes/form-errors';
import { minSelectedCheckboxes } from 'src/app/componentes/custom-validators';

interface CustomErrorMessages {
  [key: string]: {
    [errorType: string]: string;
  };
}

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit {
  formulario:FormGroup;
  mensaje:String="";
  errorMessage: string = '';
  alertbuttons=['Aceptar'];

  customMessages: CustomErrorMessages = {
    dias: {
      min: 'Mínimo 10 días',
      max: 'Máximo 31 días'
    },
    ingredientes:{
      minSelected: 'Debes seleccionar al menos dos ingredientes'
    }
  };
  
  constructor(private form:FormBuilder, private router:Router) {
    this.formulario = this.form.group({
      dias: ['', [Validators.required, Validators.min(10), Validators.max(31)]],
      ingredientes: [[], [minSelectedCheckboxes(2)]],
    });
  }

  ngOnInit() {
  }

  // Obtener mensajes de error
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
    console.log('Formulario enviado:', this.formulario.value);
  }
}
