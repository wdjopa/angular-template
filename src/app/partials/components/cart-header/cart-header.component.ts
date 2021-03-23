import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent implements OnInit {

  cart: any = { total: 0, produitCommandes: [] }
  company: any;
  companySubscription: Subscription;
  cartSubscription: Subscription;
  error: string;
  totalElement: number;

  constructor(private navigationService: NavigationService, private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();
    this.cartSubscription = this.navigationService.cartSubject.subscribe(cart => {
      this.cart = cart;
      this.totalElement = cart.produitCommandes.reduce((total, pdC) => {
        return total + pdC.quantity
      }, 0)
    })
    this.navigationService.emitCart();

  }

  ngAfterViewInit(): void {
    window["load_slicknav"]()
  }
}
