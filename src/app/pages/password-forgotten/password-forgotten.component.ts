import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
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


  constructor(private authService: AuthService, private navigationService: NavigationService, private titleService: Title, private metaTagService : Meta) {

  }

  ngOnInit(): void {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
        this.titleService.setTitle("Mot de passe oublié | "+this.company.name);
        this.metaTagService.addTags([
          { name: 'description', content: 'Commandez vos produits chez ' + this.company.name + ". " + this.company.description },
          { name: 'keywords', content: 'Ecommerce, MyStore, ' },
          { name: 'robots', content: 'index, follow' },
          { name: 'author', content: 'MyStore.africa' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'og:title', content: 'Commandez vos produits chez ' + this.company.name },
          { name: 'og:site_name', content: this.company.name },
          { name: 'og:description', content: "Procédure de réinitialisation du mot de passe" },
          { name: 'og:url', content: this.company.website ? this.company.website.includes("http") ? this.company.website : 'https://' + this.company.website : window.location.href },
          { name: 'og:image', content: this.company.logo },
          { name: 'date', content: this.company.created_at, scheme: 'YYYY-MM-DD' },
        ]);
      }
    });
    this.navigationService.emitCompany();
  }

  OnSubmit(form: NgForm) {
    this.load = true;
    this.err.champ = "";
    this.err.message = "";
    this.email = form.value["email"].trim();
    this.authService.resetPassword(this.email, this.company.name).subscribe(arg => {
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
