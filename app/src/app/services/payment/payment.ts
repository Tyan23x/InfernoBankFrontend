import { Injectable } from '@angular/core';
import { Http } from '../http/http';

interface ServiceInfo {
  id: number;
  categoria: string;
  proveedor: string;
  servicio: string;
  plan: string;
  precio_mensual: number;
  detalles: string;
  estado: string;
}

interface StartPaymentRequest {
  cardId: string;
  service: ServiceInfo;
}

@Injectable({
  providedIn: 'root'
})
export class Payment {
  private apiUrl = 'https://7a3snz44o7.execute-api.us-east-2.amazonaws.com/prod/Transaction/transactions/start';

  constructor(private httpService: Http) {}

  pay(){
    const body: StartPaymentRequest = {
      cardId: '565c7d30-c809-48dd-881c-a458b2e3e0e6',
      service: {
        id: 10,
        categoria: 'Energía',
        proveedor: 'Empresa Eléctrica Nacional',
        servicio: 'Luz Residencial',
        plan: 'Premium',
        precio_mensual: 75000,
        detalles: '300 kWh incluidos',
        estado: 'Activo'
      }
    };

    const response = this.httpService.post<any>(this.apiUrl, body);
    console.log(response);


  }

}
