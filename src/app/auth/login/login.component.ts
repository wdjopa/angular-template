import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CountryCodeService } from 'src/app/services/country-code.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  numeros: any[];
  phoneEnter: boolean = false;
  login: any = "";
  indicatif: any;
  email: string;
  tel: any;
  password: any;
  load: boolean = false;
  err: any = {};
  user: any = {};
  confirmationResult: any;
  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]
  authSubscription: Subscription;
  
  constructor(private elRef: ElementRef, private countryService: CountryCodeService, private userService: UserService, private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn === true) {
      if (this.authService.goto)
        router.navigate(["" + this.authService.goto]);
      else
        router.navigate(["/compte"]);
    }
  }

  ngOnInit() {
    this.numeros = this.countryService.countryList;
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe()
  }

  OnSubmit(form: NgForm) {
    this.load = true;
    // On grise tous les champs 
    this.disableAll()

    this.err.champ = "";
    this.err.message = "";

    let valid = true;

    this.login = form.value["login"].trim();
    this.password = form.value["password"].trim();
    if (this.login.trim() == "" || this.password.trim() == "") {
      ['login', "password"].reverse().forEach((nom) => {
        if (this[nom].trim() == "") {
          this.err.champ = nom;
        }
      })

      this.err.message = "Veuillez remplir tous les champs";
      valid = false;
      this.load = false;
      this.enableAll()
    }
    if (valid) {
      if (this.login.includes("@")) {
        this.user.email = this.login;
      } else {
        this.user.tel = this.login;
      }
      this.user.password = this.password;
      this.user.fromApi = true;
      this.authService.login(this.user)
      this.authSubscription = this.authService.nextSubject.subscribe((result: any) => {
        this.load = false;
        this.enableAll()
        if (result.state == "user connected") {
          this.authService.isAuth = true;
          this.userService.emitUser(result.user, true);
          console.log("user connecté")
          if (this.authService.goto) {
            this.router.navigate([this.authService.goto]);
          } else {
            this.router.navigate(['/accueil']);
          }
          this.confirmationResult = result.confirmationResult;
        } else {
          this.err.champ = "global";
          this.err.message = "Les informations de connexion sont invalides.";
        }
        // this.authService.nextSubject.unsubscribe()

      })
    }
  }

  saisie($event) {
    if (this.login.length > 1 && !isNaN(this.login)) {
      if (this.login[0] == '+') {
        if (this.login.length >= 4) {
          let ind = this.login.slice(0, 4)
          this.numeros.forEach((numero) => {
            if (numero.dial_code == ind) {
              this.indicatif = ind
              this.login = this.login.slice(4, this.login.length)
            }
          })
        } else if (this.login.length >= 3) {
          let ind = this.login.slice(0, 3)
          this.numeros.forEach((numero) => {
            if (numero.dial_code == ind) {
              this.indicatif = ind
              this.login = this.login.slice(3, this.login.length)
            }
          })
        } else if (this.login.length >= 2) {
          let ind = this.login.slice(0, 2)
          this.numeros.forEach((numero) => {
            if (numero.dial_code == ind) {
              this.indicatif = ind
              this.login = this.login.slice(2, this.login.length)
            }
          })
        }
      }
      this.phoneEnter = true;
    } else {
      if (!this.indicatif) {
        this.phoneEnter = false;
      }
    }
    if (this.login.includes('@')) {
      this.phoneEnter = false;
    }
  }


  disableAll() {
    this.elRef.nativeElement.querySelectorAll('form input').forEach((elt) => {
      elt.setAttribute("disabled", "disabled");
    })
    this.elRef.nativeElement.querySelectorAll('form select').forEach((elt) => {
      elt.setAttribute("disabled", "disabled");
    })
    this.elRef.nativeElement.querySelectorAll('form button').forEach((elt) => {
      elt.setAttribute("disabled", "disabled");
    })
  }


  enableAll() {
    this.elRef.nativeElement.querySelectorAll('form input').forEach((elt) => {
      elt.removeAttribute("disabled");
    })
    this.elRef.nativeElement.querySelectorAll('form select').forEach((elt) => {
      elt.removeAttribute("disabled");
    })
    this.elRef.nativeElement.querySelectorAll('form button').forEach((elt) => {
      elt.removeAttribute("disabled");
    })
  }
  counter(i: number) {
    return new Array(i);
  }

}
