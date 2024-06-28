import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backend: string

  constructor(private http:HttpClient) {
    this.backend = environment.api;
  }
  
  obtenerDietas(id_itinerario:string){
    let token= localStorage.getItem('authToken');
    let id_usuario= localStorage.getItem('ID_Usuario');

    console.log(token)
    console.log(id_usuario)
    console.log(id_itinerario)

    let header= new HttpHeaders({'Content-Type':'application/json;charset=utf-8', 'Authorization': `Bearer ${token}`})
                                .append("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
                                .append('Access-Control-Allow-Origin','*',)
                                .append('Access-Control-Allow-Methods','*');
    
    let body = {"ID_Itinerario":id_itinerario};
    
    return this.http.post(`${this.backend}/user@id=${id_usuario}/plan/dietas`, body,{headers:header })
  }

  obtenerRecetasDeDieta(idDieta:number){
    let token= localStorage.getItem('authToken');
    let id_usuario= localStorage.getItem('ID_Usuario');

    let header= new HttpHeaders({'Content-Type':'application/json;charset=utf-8', 'Authorization': `Bearer ${token}`})
                                .append("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
                                .append('Access-Control-Allow-Origin','*',)
                                .append('Access-Control-Allow-Methods','*');
    
    
    return this.http.get(`${this.backend}/user@id=${id_usuario}/plan/dieta@id=${idDieta}/recetas`,{headers:header })
  }

}
