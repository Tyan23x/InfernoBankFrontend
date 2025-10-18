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

  pay( pago: StartPaymentRequest){
    const response = this.httpService.post<any>(this.apiUrl, pago);
    console.log(response);
  }

}
