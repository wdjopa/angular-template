import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { auth, apps, initializeApp } from 'firebase';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subscription } from 'rxjs';

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
  breadcrumbs = [{ "name": "Accueil", "link": "/accueil" }]

  company: any;
  companySubscription: Subscription;
  dataSubscription: Subscription;

  constructor(private elRef: ElementRef, private navigationService: NavigationService, private userService: UserService, private authService: AuthService, private router: Router, private dataService: DataService) {
    var config = environment.firebase;
    // if (apps.length === 0) {
    //   initializeApp(config);
    //   auth().useDeviceLanguage();
    // }

    if (this.authService.isLoggedIn === true) {
      if (this.authService.goto)
        router.navigate(["" + this.authService.goto]);
      else
        router.navigate(["/compte"]);
    }
  }

  ngOnInit() {
    this.dataSubscription = this.authService.nextSubject.subscribe(ret => {
      if (ret.err){
        console.log(ret.err)
        if(ret.err.email){
          this.err.message = "Cet email est déjà utilisé. Veuillez vous connecter."
        }else if(ret.err.tel){
          this.err.message = "Ce numéro de téléphone est déjà utilisé. Veuillez vous connecter."
        }
        else{
          this.err.message = "Un problème est survenu lors de votre inscription. Si le problème persiste, contactez-nous au "+this.company.tel
        }
        this.err.field = "registration"
      }else{
        if(ret.user){

        }
      }
    })
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();
  }


  ngOnDestroy(){
    if (this.companySubscription)
    this.companySubscription.unsubscribe()
    if (this.dataSubscription)
    this.dataSubscription.unsubscribe()
  }
  onSubmit(form: NgForm) {
    this.err = {}
    const { prenom, nom, password, confirm_password, email, tel, accept_cgu } = form.value;
    if (password != confirm_password || password.length < 4) {
      this.err.field = "password"
      this.err.message = "Vos mots de passe sont différents."
      return;
    }

    if (!accept_cgu) {
      this.err.field = "accept_cgu"
      this.err.message = "Vous devez accepter les CGU pour pouvoir vous inscrire."
      return;
    }

    if (nom != "" && email != "" && tel != "" && password != "") {
      let data_user = { firstname: nom, surname: prenom, email, tel, password, phone_verified: false, fromApi: true, entreprise: this.company.id, other: { legal: { accept_cgu: true, for_company: this.company.id, date: new Date(), } } };
      // console.log(JSON.stringify(data_user))
      this.authService.saveUser(data_user);
      
    } else {
      this.err.field = "all"
      this.err.message = "Veuillez remplir tous les champs présentant un astérisque (*)"
    }

  }

}
