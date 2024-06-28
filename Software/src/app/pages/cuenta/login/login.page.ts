import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { FormError, mensajesErr } from 'src/app/componentes/form-errors';
import { Router } from '@angular/router';

import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario:FormGroup;
  mensaje:String="";
  errorMessage: string = '';

  constructor(private form:FormBuilder, private router:Router, private authService:AutenticacionService) {
    this.formulario = this.form.group({
      correo:['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    });
  }

  ngOnInit() {
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

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log('Formulario enviado:', this.formulario.value);

    const correo = this.formulario.get("correo")?.value;
    const password = this.formulario.get("password")?.value;

    this.authService.IniciarSesion(correo,password).subscribe(
      response => {
        //Respuesta API
        console.log("Respuesta enviada", response['message']);
        this.mensaje = "Respuesta enviada";
        if(response['message'] == 'Login Exitoso!'){
          this.router.navigateByUrl('/home');
        }
        else{
          console.log("EL USUARIO NO EXISTE!")
        }
      },
      error => {
        //Error API
        console.error('Error en petición',error);
        this.errorMessage = "Algo ocurrió mal, intenta de nuevo";
      }
    );
  }
}
