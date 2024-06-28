import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

import { passwordMatchValidator, rutValidator } from 'src/app/componentes/form-validators';
import { FormError, mensajesErr } from 'src/app/componentes/form-errors';
import { Router } from '@angular/router';


import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage{
  alertbuttons=['Aceptar'];
  formulario:FormGroup;
  mensaje:String="";
  errorMessage: string = '';

  constructor(private form:FormBuilder,private router:Router, private authService:AutenticacionService) {
    this.formulario = this.form.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      correo: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      confirm_password:['',[Validators.required,passwordMatchValidator]],
    });
  }


  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log(this.formulario.value);

    const usuario = this.formulario.get("usuario")?.value;
    const correo = this.formulario.get("correo")?.value;
    const password = this.formulario.get("password")?.value;

    this.authService.RegistroUsuario(usuario,correo,password).subscribe(
      response => {
        //Respuesta API
        console.log("Respuesta enviada", response);
        this.mensaje = "Respuesta enviada";
        this.router.navigateByUrl('/login');
      },
      error => {
        //Error API
        console.error('Error en petición',error);
        this.errorMessage = "Algo ocurrió mal, intenta de nuevo";
      }
    );
  }

  // Obtener mensajes de error
  formError(campo: string): string | null {
    const control = this.formulario.get(campo);
    if (control && control.errors) {
      const error: FormError = Object.keys(control.errors)[0] as FormError;
      return mensajesErr[error];
    }
    return null;
  }
}
