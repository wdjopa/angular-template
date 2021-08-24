import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  address: any = {
    family_name: "", given_name: "", label: "", city: "", country: "", street: "", additional_address: "", postal_code: "", billing: "", shipping: "", attributes: { tel : "" }
  };
  err: any = {};
  edition: boolean = false;
  address_type: any;
  userSubscription: Subscription;
  companySubscription: Subscription;
  addressesSubscription: Subscription;

  constructor(private userService: UserService, private navigationService: NavigationService, private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    let id = this.route.snapshot.params['addressId'];

    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });

    this.userSubscription = this.userService.userSubject.subscribe(user => {
      this.user = user;
      if (id) {
        this.getAddress(id)

        // this.reloadComponent()
      }
    });
  }
  getAddress(id) {
    this.addressesSubscription = this.dataService.getAddresses(id).subscribe(address => {
      this.edition = true;
      this.address = address
      // // console.log("address", this.address, parseInt(id))
      if (this.address) {
        this.address_type = this.address.is_shipping == 1 ? 'shipping' : 'billing'
      }
    })
  }

  ngOnInit(): void {
    this.navigationService.emitCompany();
    this.userService.refreshUser()
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  ngAfterViewInit() {
    // // console.log("after init view")
    // this.userService.refreshUser()
  }

  onSubmit(form: NgForm) {
    this.err = {}
    const { label, address_type, prenom, nom, line1, line2, city, country, postal, tel } = form.value;
    if (address_type != "" && prenom != "" && nom != "" && line1 != "" && city != "" && tel != "" && country != "") {
      if (!this.edition) {
        this.dataService.addAddress({ family_name: nom, given_name: prenom, label, city, country, street: line1, additional_address: line2, postal_code: postal, billing: address_type === "billing" ? true : undefined, shipping: address_type === "shipping" ? true : undefined, fromApi: true, attrs: { tel } }).subscribe((data: any) => {
          this.navigationService.openSnackBar(data.success, "FERMER")
          this.userService.user.addresses = data.addresses
          this.userService.refreshUser()
        })
      } else {
        this.dataService.editAddress({ address_id: this.address.id, family_name: nom, given_name: prenom, label, city, country, street: line1, additional_address: line2, postal_code: postal, billing: address_type === "billing" ? true : undefined, shipping: address_type === "shipping" ? true : undefined, fromApi: true, attrs: { tel } }).subscribe((data: any) => {
          if (data.success) {
            this.navigationService.openSnackBar(data.success, "FERMER")
            this.user.addresses = this.user.addresses.map(address => {
              if (address.id === data.address.id) {
                this.address = data.address
                return data.address
              }
              return address
            })
          } else {
            this.navigationService.openSnackBar(data.error, "FERMER")
          }
          this.userService.refreshUser()
        })

      }
      form.reset()
    } else {
      this.err.field = "all"
      this.err.message = "Veuillez remplir tous les champs présentant un astérisque (*)"
    }
  }

  deleteAddress() {
    this.dataService.delAddress({ id: this.address.id }).subscribe((data: any) => {
      this.navigationService.openSnackBar(data.success, "FERMER")
      this.userService.user.addresses = data.addresses
      this.userService.refreshUser()
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    if(this.addressesSubscription)
    this.addressesSubscription.unsubscribe();
  }
}
