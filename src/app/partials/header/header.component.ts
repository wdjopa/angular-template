import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart: any = { total: 0, produitCommandes: [] }
  company: any;
  companySubscription: Subscription;
  error: string;
  userLogged = false;
  user: any;
  storage_url: any;
  constructor(private navigationService: NavigationService, private route: ActivatedRoute,
    private authService: AuthService, private configService: ConfigService, private userService: UserService
  ) {
    this.storage_url = this.configService.storage;

    // if (this.authService.isLoggedIn === true) {
    //   this.userLogged = true;
    // }

  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.userService.userSubject.subscribe(user => {
      if (user.email) {
        console.log("user in header", user)
        this.userLogged = true;
        this.user = user
      }else{
        this.userLogged = false;
      }
    });
    this.userService.refreshUser()
  }

  ngAfterViewInit(): void {
    window["load_slicknav"]()
    this.navigationService.emitCompany();
  }
}
