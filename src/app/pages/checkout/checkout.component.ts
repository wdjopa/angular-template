import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentComponent } from 'src/app/modal/payment/payment.component';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]
  discount_code: string = "";
  cart: any = { total: 0, produitCommandes: [] }
  company: any;
  user: any;
  companySubscription: Subscription;
  error: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  totalElement: number;
  err: any = {};
  shippingAddresses: any = [];
  addressesSubscription: Subscription;
  shippingAddress: any = {};
  payment: any = { mode: '' }
  loading: boolean = false;
  paymentModes: any = [];
  show = false;

  constructor(private cdRef: ChangeDetectorRef, public dialog: MatDialog, private userService: UserService, private navigationService: NavigationService, private route: ActivatedRoute, private dataService: DataService,
    private router: Router) {
  }

  ngOnDestroy() {
    if (this.cartSubscription)
      this.cartSubscription.unsubscribe()
    if (this.userSubscription)
      this.userSubscription.unsubscribe()
    if (this.addressesSubscription)
      this.addressesSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.cartSubscription = this.navigationService.cartSubject.subscribe(panier => {
      this.cart = { ...panier };
    })
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
        this.paymentModes = Object.keys(company.datas.payments).map(payment_id => {
          const payment = company.datas.payments[payment_id]
          return {
            ...payment,
            id: payment_id,
            name: payment.full_name || payment_id,
          }
        }).filter(c => c.accept)

      }
    });
    this.userSubscription = this.userService.userSubject.subscribe(user => {
      this.user = user;
      this.getAddresses()
    });
    this.userService.refreshUser()

  }

  ngAfterViewChecked() {
    let s = this.cart && this.cart.produitCommandes && this.cart.produitCommandes.length > 0 && this.company != undefined;
    if (s != this.show) {
      this.show = s;
      this.cdRef.detectChanges();
    }

  }

  selectPaymentMode(mode) {
    if (!this.loading)
      this.payment.mode = mode;


  }

  selectAddress(address) {
    if (!this.loading)
      this.shippingAddress = address;
  }

  getAddresses() {
    this.addressesSubscription = this.dataService.getAddresses().subscribe((addresses: any) => {
      this.shippingAddresses = addresses.filter(adresse => adresse.is_shipping === 1)
    })
  }

  ngAfterViewInit(): void {
    this.navigationService.emitCompany();
    this.navigationService.emitCart();
  }

  makeAnOrder(form: NgForm) {
    if (this.loading)
      return;

    this.err = {}

    const { note } = form.value;
    if (this.shippingAddress.label && this.payment.mode != "") {
      this.loading = true;
      let command: any = {}
      command.entreprise_id = this.company.id;
      command.produits = this.cart.produitCommandes.map(pdC => { return { ...pdC, id: pdC.produit.id } });
      command.subtotal = this.cart.subtotal;
      command.montant = this.cart.total;
      command.note = note;
      command.reduction = this.cart.discount;
      command.client = this.user;
      command.shipping = {
        address_id: this.shippingAddress.id,
        address_type: 2,
        address: this.shippingAddress,
        state: 0,
        human_date: new Date(),
        date: Date.now() * 1000,
        mode: "shipping",
      }
      command.payment = {
        state: 0,
        date: new Date(),
        mode: this.payment.mode,
        intent: undefined
      }
      command.source = "website";
      command.livraison = this.company.tarif_livraison
      command.total = this.cart.total
      // // console.log(this.token)

      this.dataService.newCommand(command).subscribe((command: any) => {
        if (command.error) {
          this.loading = false;
          this.navigationService.openSnackBar("Une erreur est survenue lors du passage de votre commande", "FERMER")
        } else {
          this.navigationService.openSnackBar("Votre commande a été passée avec succès", "FERMER", 20000)

          if (this.paymentModes.filter(p => p.id === this.payment.mode)[0].id == 'cash') {

            this.navigationService.emptyCart();
            this.router.navigate(["/thank-you"]);
          } else {

            const dialogRef = this.dialog.open(PaymentComponent, {
              width: '450px',
              disableClose: true,
              data: { command, company: this.company, payment: this.paymentModes.filter(p => p.id === this.payment.mode)[0] }
            });

            dialogRef.afterClosed().subscribe(result => {
              // console.log('The dialog was closed');
              if (result.success) {
                this.navigationService.openSnackBar("Votre paiement a été effectué avec succès", "FERMER", 2000)
              } else {
                this.navigationService.openSnackBar("Votre paiement n'a pas abouti. Vous pourrez réessayer dans vos commandes", "FERMER", 2000)
              }
              this.navigationService.emptyCart();
              this.router.navigate(["/thank-you"]);
            });
          }
          // this.dataService.updateUser();
        }
      }, (error) => {
        // console.log(error)
        this.loading = false;
        this.navigationService.openSnackBar(error.error.message, "FERMER", 20000)
      })
    }
    else {
      if (this.payment.mode === "") {
        this.err.payment = true
      }
      if (!this.shippingAddress.is_shipping) {
        this.err.shipping = true
      }
    }
  }
}
