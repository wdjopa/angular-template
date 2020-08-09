import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  public goto: any;
  token = this.configService.token
  isAuth = false;
  nextSubject = new Subject<any>();
  commandSubject = new Subject<any>();


  constructor(private http: HttpClient, private userService: UserService, private dataService: DataService, private configService: ConfigService, private navigationService: NavigationService) {
  }

  newCommand(cart, results, reduction, total, payment_intent, blockchain = null) {
    // console.log(cart, results);
    let command: any = {}
    command.restaurant_id = cart.restaurant.id;
    command.produits = cart.produits;
    command.subtotal = cart.total;
    command.note = cart.note;
    command.reduction = reduction;
    command.client = this.userService.user;
    command.shipping = {
      address: results[1].result.livraison,
      state: 0,
      human_date: results[2].result.shipping.date,
      date: results[2].result.shipping.timestamp,
      mode: results[2].result.shipping.mode,
    }
    command.payment = {
      state: 0,
      date: (results[3].result.payment.mode == 'mc' ? new Date() : null),
      mode: results[3].result.payment.mode,
      intent: payment_intent
    }
    command.source = "express";
    command.livraison = results[2].result.shipping.price
    command.total = total
    console.log(command)
    console.log(JSON.stringify({ ...command, blockchain }))
    // console.log(this.token)
    this.http.post(this.configService.url + this.configService.api + "commands", { ...command, blockchain }, this.configService.httpOptions).subscribe((command: any) => {
      if (command.error) {
        this.navigationService.openSnackBar("Une erreur est survenue lors du passage de votre comamnde", "FERMER")
      } else {
        this.commandSubject.next(command)
        this.navigationService.emptyCart()
        this.dataService.updateUser();
        this.navigationService.currentRestaurantUpdated()
        this.http.get(this.configService.url + this.configService.api + "sendmail/" + command.id, this.configService.httpOptions).subscribe((mail) => {
          // console.log("Le mail vous a été envoyé")
          // console.log(mail)
          this.navigationService.openSnackBar("Un email de récapitulatif de commande vous a été envoyé", "FEMER")
        })
      }
    }, (error) => {
      console.log(error)
      this.navigationService.openSnackBar(error.error.message, "FERMER", 20000)
      this.commandSubject.next({})
    })
  }

}
