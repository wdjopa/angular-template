import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  PaymentSubject = new Subject<any>();
  date: number = (localStorage.getItem("date")) ? parseInt(localStorage.getItem("date")) : 0;


  constructor(private http: HttpClient, private configService: ConfigService) { }
  payByMobileMoney({ tel, operateur, amount, command }) {
    return this.http.post<any>(this.configService.url + this.configService.api + "payments/mobilemoney/charge", JSON.stringify({ phoneService: operateur, amount, phone: tel, command_id: command.id, fees : true, }), this.configService.httpOptions)
  }

  postReview(restaurant, note, message) {
    // console.log(note, message, restaurant.nom)
    return this.http.post<any>(this.configService.url + this.configService.api + "avis", JSON.stringify({ type: "entreprise", message: message, id: restaurant.id, note: note }), this.configService.httpOptions)
  }

  addAddress(adresse) {
    // console.log(JSON.stringify(adresse))
    adresse.fromApi = true;
    return this.http.post<any>(this.configService.url + this.configService.api + "clients/addresses", adresse, this.configService.httpOptions)
  }
}
