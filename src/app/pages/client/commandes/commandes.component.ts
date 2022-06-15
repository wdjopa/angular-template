import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  company: any;
  user: any;
  commandes: any = [];
  companySubscription: Subscription;
  userSubscription: Subscription;
  commandSubscription: Subscription;
  constructor(private userService: UserService, private navigationService: NavigationService, private dataService: DataService) {

    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      console.clear()
      if (company) {
        this.company = company
      }
      this.userService.refreshUser()
    });

    this.userSubscription = this.userService.userSubject.subscribe(user => {
      this.user = user;
      this.getCommands()
    });
  }

  getCommands() {
    if (this.company) {
      this.commandSubscription = this.dataService.getCommands().subscribe((response: any) => {
        this.commandes = response.data.filter(command => command.company.id == this.company.id).map(command => {
          return {
            ...command, produits: command.produits.map(produit => {
              let properties = JSON.parse(produit.pivot.properties)
              return {
                ...produit,
                pivot: { ...produit.pivot, properties: properties ? Object.keys(properties).map(p => { return p+": "+Object.keys(properties[p])}).join("; ") : null }
              }
            })
          }
        })

      })
    }
  }

  ngOnDestroy() {
    if (this.companySubscription)
      this.companySubscription.unsubscribe();
    if (this.commandSubscription)
      this.commandSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.emitCompany();
  }

  JSONParse(data) {

    let a = JSON.parse(data)
    return a

  }

}
