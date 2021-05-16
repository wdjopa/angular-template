import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]
  email: string;
  load: boolean = false;
  success: any = {};
  err: any = {};

  company: any;
  companySubscription: Subscription;

  constructor(private authService: AuthService, private navigationService: NavigationService, private router: Router) {

  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();
  }

  OnSubmit(form: NgForm) {
    this.load = true;
    this.err.champ = "";
    this.err.message = "";
    this.email = form.value["email"].trim();
    this.authService.resetPassword(this.email, this.company.nom).subscribe(arg => {
      this.load = false;
      console.log("reset password", arg)
      this.success.message = "Un email vous a été envoyé à l'adresse " + this.email + ". Pensez à vérifier vos spams.";
    }, (err) => {
      this.load = false;
      if (err.error.error.toLowerCase().includes("model")) {
        this.err.message = "Cet email n'est pas enregistré.";
      } else {
        this.err.message = this.err.error.message;
      }
    });

  }

}
