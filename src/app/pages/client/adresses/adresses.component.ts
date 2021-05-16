import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.scss']
})
export class AdressesComponent implements OnInit {

  company: any;
  user: any;
  commandes: any;
  adresses_facturation: any = [];
  adresses_livraison: any = [];
  companySubscription: Subscription;
  userSubscription: Subscription;
  constructor(private userService: UserService, private navigationService: NavigationService, private dataService: DataService) {

  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe()
    this.companySubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();
    this.userSubscription = this.userService.userSubject.subscribe(user => {
      this.user = user;
      // console.clear()
      this.getAddresses()
      // if (this.user.addresses) {
      //   this.adresses_facturation = this.user.addresses.filter(adresse => adresse.is_billing === 1)
      //   this.adresses_livraison = this.user.addresses.filter(adresse => adresse.is_shipping === 1)
      // }
    });
    this.userService.refreshUser()
  }
  getAddresses() {
    this.dataService.getAddresses().subscribe((addresses:any) => {
      this.adresses_facturation = addresses.filter(adresse => adresse.is_billing === 1)
      this.adresses_livraison = addresses.filter(adresse => adresse.is_shipping === 1)
    })
  }

}
