import { Component, OnInit, ElementRef } from '@angular/core';
import { CountryCodeService } from '../../services/country-code.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { auth, apps, initializeApp } from 'firebase';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  numeros: any[];
  indicatif: any = "+237";
  nom: string;
  prenom: string;
  email: string;
  tel: any;
  password: any;
  confirm_password: any;
  load: boolean = false;
  err: any = {};
  step: number = 0;
  code: any;
  user: any = {};
  confirmationResult: any;

  data: any = { identifiant: "", conditions: false };
  correct: boolean;
  edit: boolean = false;
  loading = false;
  success: string;

  constructor(private elRef: ElementRef, private countryService: CountryCodeService, private userService: UserService, private authService: AuthService, private router: Router, private dataService: DataService) {
    var config = environment.firebase;
    if (apps.length === 0) {
      initializeApp(config);
      auth().useDeviceLanguage();
    }

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

  identifiantEdit() {
    this.data.identifiant = this.data.identifiant.split(" ").join("_")
  }

  updateForm(event) {
    this.correct = false;
    console.log(this.data)
    if (this.data.identifiant.length > 0 && this.data.conditions === true) {
      this.correct = true;
    }
    this.loading = true;
    if (this.data.identifiant.length > 0) {
      if (/^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/.test(this.data.identifiant)) {

        this.dataService.checkIdentifiantExist(this.data.identifiant).subscribe((result: any) => {
          this.loading = false;
          console.log(result)
          if (result.wallet) {
            this.success = ""
            this.err.champ = "identifiant"
            this.err.message = "L'identifiant " + result.id + " est déjà utilisé. Ajoutez des chiffres ou des lettres pour faire la différence"
          } else {
            this.err.champ = ""
            this.err.message = ""
            this.success = "L'identifiant " + result.id + " est disponible";
            // this.dialogRef.close(this.data);

          }
        })
      } else {
        this.success = ""
        this.err.champ = "identifiant"
        this.err.message = "Votre identifiant doit être uniquement constitué de lettres, de chiffres ou des caractères (_.-) "
      }
    }
  }

  checkIdentifiant() {
    this.loading = true;
    this.dataService.checkIdentifiantExist(this.data.identifiant).subscribe((result: any) => {
      this.loading = false;
      if (result.wallet) {
        this.correct = false;
        this.success = ""
        this.err = "L'identifiant " + result.id + " est déjà utilisé. Ajoutez des chiffres ou des lettres pour faire la différence"
      } else {
        this.err = ""
        this.success = 'Création de votre compte en cours'
        this.correct = true;

      }
    })
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
  OnSubmit(form: NgForm) {
    this.load = true;
    // On grise tous les champs 
    this.disableAll()

    this.err.champ = "";
    this.err.message = "";

    if (this.step == 0) {

      let valid = true;

      this.indicatif = form.value["indicatif"].trim();
      this.nom = form.value["nom"].trim();
      this.prenom = form.value["prenom"].trim();
      this.email = form.value["email"].trim();
      this.tel = form.value["tel"].trim();
      this.password = form.value["password"].trim();
      this.confirm_password = form.value["confirm_password"].trim();
      if (this.nom.trim() == "" || this.prenom.trim() == "" || this.email.trim() == "" || this.tel.trim() == "" || this.password.trim() == "") {

        ['prenom', 'nom', 'email', 'tel', "password"].reverse().forEach((nom) => {
          if (this[nom].trim() == "") {
            this.err.champ = nom;
          }
        })
        this.err.message = "Veuillez remplir tous les champs";
        valid = false;
        this.load = false;
        this.enableAll()
      }

      if (this.password != this.confirm_password && this.password.length < 8) {
        this.err.champ = "password";
        if (this.password.length < 8) {
          this.err.message = "Mot de passe avec minimum 8 lettres";
        }
        else {
          this.err.message = "Les mots de passe sont différents";
        }
        valid = false;
        this.load = false;
        this.enableAll()

      } else {
      }

      if (valid) {
        if (this.step == 0) {

          window['recaptchaVerifier'] = new auth.RecaptchaVerifier('singUpBtn', {
            'size': 'invisible',
            'callback': function (response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              this.OnSubmit();
            }
          });
        }

        this.user.surname = this.prenom;
        this.user.firstname = this.nom;
        this.user.email = this.email;
        this.user.tel = this.indicatif + this.tel;
        this.user.password = this.password;
        this.user.fromApi = "true";
        this.authService.signUp(this.user, window['recaptchaVerifier'])
        this.authService.nextSubject.subscribe((result: any) => {
          this.load = false;
          this.enableAll();
          if (result.state == "code sent") {
            this.step = 1;
            this.confirmationResult = result.confirmationResult;
            // console.log("result", result.confirmationResult)
          } else {
            if (this.step == 0) {

              this.err.champ = "global"
              this.err.message = result.err.code
            }
          }
          // this.authService.nextSubject.unsubscribe()

        })
        // this.userService.signUp(user);
        // form.reset();
      }
    } else if (this.step == 1) {
      this.code = form.value["code"];
      this.load = false;
      this.authService.signInCodeVerification(this.confirmationResult, this.code, this.user)
      this.authService.nextSubject.subscribe((result: any) => {
        // console.log(result)
        if (result.state == "user created") {
          this.step = 2;
          if (this.authService.goto) {
            this.router.navigate([this.authService.goto]);
          } else {
            this.router.navigate(['/accueil']);
          }
        } else {
          this.err.champ = "global"
          this.err.message = result.err
        }
        // this.authService.nextSubject.unsubscribe()

      })
    }
  }
  saisie($event) {
    if (!this.tel) {
      this.tel = this.elRef.nativeElement.querySelector('#tel').value
    }
    if (this.tel.length > 1) {
      if (this.tel[0] == '+') {
        if (this.tel.length >= 4) {
          let ind = this.tel.slice(0, 4)
          this.numeros.forEach((numero) => {
            if (numero.dial_code == ind) {
              this.indicatif = ind
              this.tel = this.tel.slice(4, this.tel.length)
            }
          })
        } else if (this.tel.length >= 3) {
          let ind = this.tel.slice(0, 3)
          this.numeros.forEach((numero) => {
            if (numero.dial_code == ind) {
              this.indicatif = ind
              this.tel = this.tel.slice(3, this.tel.length)
            }
          })
        } else if (this.tel.length >= 2) {
          let ind = this.tel.slice(0, 2)
          this.numeros.forEach((numero) => {
            if (numero.dial_code == ind) {
              this.indicatif = ind
              this.tel = this.tel.slice(2, this.tel.length)
            }
          })
        }
      }
    }
  }

}
