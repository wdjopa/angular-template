import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adresses-add',
  templateUrl: './adresses-add.component.html',
  styleUrls: ['./adresses-add.component.scss']
})

export class AdressesAddComponent implements OnInit {
  company: any;
  user: any;
  commandes: any;
  address: any = {};
  err: any = {};
  edition: boolean = false;
  constructor(private userService: UserService, private navigationService: NavigationService, private route: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['addressId'];

    this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();

    this.userService.userSubject.subscribe(user => {
      this.user = user;
      if (id) {
        let form: NgForm;
        this.edition = true;
        this.address = this.user.addresses.filter(adresse => adresse.id === id)[0]
        form.value["line2"] = this.address.street
        form.value["line2"] = this.address.additionnal_address
        form.value["given_name"] = this.address.given_name
        form.value["family_name"] = this.address.family_name
      }
    });
    this.userService.refreshUser()
  }

  onSubmit(form: NgForm) {
    this.err = {}
    const { label, address_type, prenom, nom, line1, line2, city, country, postal, tel } = form.value;
    if (address_type != "" && prenom != "" && nom != "" && line1 != "" && line2 != "" && city != "" && tel != "" && country != "") {
      if (!this.edition) {
        this.dataService.addAddress({ family_name: nom, given_name: prenom, label, city, country, street: line1, additional_address: line2, postal_code: postal, billing: address_type === "billing" ? true : undefined, shipping: address_type === "shipping" ? true : undefined, fromApi: true, attrs: { tel } }).subscribe((data: any) => {
          this.navigationService.openSnackBar(data.success, "FERMER")
          this.userService.user.addresses = data.addresses
          this.userService.refreshUser()
        })
      } else {

      }
      form.reset()
    } else {
      this.err.field = "all"
      this.err.message = "Veuillez remplir tous les champs présentant un astérisque (*)"
    }
  }

  deleteAddress() {

  }
}
