import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit {

  company: any;
  user: any;
  commandes: any;
  adresses_facturation: any;
  adresses_livraison: any;

  constructor(private userService: UserService, private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();

    this.userService.userSubject.subscribe(user => {
      this.user = user;
      console.clear()
      console.log(this.user)
      this.adresses_facturation = this.user.addresses.filter(adresse => adresse.is_billing === 1)
      this.adresses_livraison = this.user.addresses.filter(adresse => adresse.is_shipping === 1)
    });
    this.userService.refreshUser()
  }

}
