import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private backend: string

  constructor(private http:HttpClient) {
    this.backend = environment.api;
  }

  IniciarSesion(correo:string,contraseña:string):Observable<any>{
    let header= new HttpHeaders({'Content-Type':'application/json;charset=utf-8'})
                                .append("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
                                .append('Access-Control-Allow-Origin','*',)
                                .append('Access-Control-Allow-Methods','*');
  
    let body={"Correo":correo,"Contraseña":contraseña};

    return this.http.post(`${this.backend}/login`, body, {headers:header }).pipe(
      tap((response: any) => {
        const token = response['access_token'];
        const id_usuario = response['ID_Usuario'];

        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('ID_Usuario', id_usuario);
          console.log(localStorage.getItem('authToken'));
        }
      })
    );
  }

  RegistroUsuario(nombre:string, correo:string, contraseña:string):Observable<any>{
    let header= new HttpHeaders({'Content-Type':'application/json;charset=utf-8'})
                                .append("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
                                .append('Access-Control-Allow-Origin','*',)
                                .append('Access-Control-Allow-Methods','*');
    
    let body={"Nombre":nombre,"Correo":correo,"Contraseña":contraseña};

    return this.http.post(`${this.backend}/register`, body, {headers:header })
  }

  obtenerItinerario(){
    let token= localStorage.getItem('authToken');
    let id_usuario= localStorage.getItem('ID_Usuario');
    let header= new HttpHeaders({'Content-Type':'application/json;charset=utf-8', 'Authorization': `Bearer ${token}`})
                                .append("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
                                .append('Access-Control-Allow-Origin','*',)
                                .append('Access-Control-Allow-Methods','*');
    
    return this.http.get(`${this.backend}/user@id=${id_usuario}/plan`, {headers:header }).pipe(
      // tap((response: any) => {
      //   const id_itinerario = response[1].ID_itinerario;
      //   console.log("ID ITINERARIO:")
      //   console.log(response[1].ID_Itinerario)
      //   localStorage.setItem('id_itinerario',id_itinerario)
      // })
    );
  }

  obtenerToken():string | null{
    return localStorage.getItem('authToken');
  }
}
