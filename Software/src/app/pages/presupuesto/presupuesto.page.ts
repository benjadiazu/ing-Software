import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.page.html',
  styleUrls: ['./presupuesto.page.scss'],
})
export class PresupuestoPage implements OnInit {
  userInfo:any;

  constructor(private autenService:AutenticacionService) {
    
  }

  ngOnInit() {
    console.log("obtener presupuesto")
    this.autenService.obtenerItinerario().subscribe(
      data => {
        this.userInfo = data;
        console.log(this.userInfo)
      },
      error => {
        console.error('Error al obtener itinerario', error);
      }
    );
  }

}
