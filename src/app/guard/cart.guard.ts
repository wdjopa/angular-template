import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  constructor(private cartService: NavigationService,
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.cartService.readCart();
    if (this.cartService.cart && this.cartService.cart.restaurant && this.cartService.cart.restaurant.id) {
      return true;
    } else {
      this.router.navigate(['/panier']);
    }
  }

}
