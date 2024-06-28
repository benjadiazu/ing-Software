import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  alertbuttons=['Aceptar'];
  dietaInfo:any;
  infoAux:any;
  id_itinerario:any;
  selectedDateRecipes: number = 0;
  id_dieta:number = 0;
  recetas:any;

  constructor(private userService:UserService, private autenService:AutenticacionService) {

  }

  ngOnInit(): void {
    console.log("obtener itinerario")
    this.autenService.obtenerItinerario().subscribe(
      itinerarioData  => {
        this.infoAux = itinerarioData ;
        console.log("Informacion itinerario:")
        console.log(this.infoAux)
        this.id_itinerario = this.infoAux[1].ID_Itinerario;
        //OBTENER DIETAS
        console.log("obtener dietas");
        this.userService.obtenerDietas(this.id_itinerario).subscribe(
          data => {
            this.dietaInfo = data;
            console.log(this.dietaInfo)
          },
          error => {
            console.error('Error al obtener dietas', error);
          }
        );
      },
      error => {
        console.error('Error al obtener itinerario', error);
      }
    );
  }
  
  onDateChange(event:any){
    const selectedDateISO = event.detail.value;
    const selectedDate = new Date(selectedDateISO);
    const dia = selectedDate.getDate();
    const mes = selectedDate.getMonth() + 1;

    const dieta = this.dietaInfo[1].find((d: { Dia: any; Mes: any; }) => d.Dia === dia && d.Mes === mes);

    if (dieta) {
      this.selectedDateRecipes = dieta["Cantidad de Recetas"];
      this.id_dieta = dieta["ID_dieta"];
      this.userService.obtenerRecetasDeDieta(this.id_dieta).subscribe(
        dataRecetas => {
          this.recetas = dataRecetas;
          console.log("Informacion recetas de la dieta:")
          console.log(this.recetas)
          console.log(this.recetas[1][0].Nombre)
          
        },
        error => {
          console.error('Error al obtener itinerario', error);
        }
      );
    } else {
      this.selectedDateRecipes = 0;
    }

  }
 
}
