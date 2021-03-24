import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: any;


  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    // if (this.authService.isLoggedIn === true) {
    //   if (this.authService.goto)
    //     router.navigate(["" + this.authService.goto]);
    //   else
    //     router.navigate(["/connexion"]);
    // }
  }

  ngOnInit(): void {
    this.userService.userSubject.subscribe(user => this.user = user);
  }

}
