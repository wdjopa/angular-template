import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Subject, throwError } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public goto: any;
  token = this.configService.token
  isAuth = false;
  auth = false
  nextSubject = new Subject<any>();

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private configService: ConfigService, private navigationService: NavigationService) {
    this.signInWithToken();
  }

  signInWithToken() {
    if (!this.token) {
      this.isAuth = false;
      this.userService.emitUser(null, true);
    } else {
      this.http.get(this.configService.url + this.configService.api + "clients", this.configService.httpOptions).subscribe((data: any) => {
        if (data.message && data.message.toLowerCase() == "unauthenticated") {
          this.isAuth = false;
          localStorage.removeItem("token")
          console.log("Signin")

          this.userService.emitUser(null, true);
        } else {
          this.isAuth = true;
          this.userService.user = data;
          console.log("Signin error 1")
          this.userService.emitUser(data, true);
        }
      }, (error) => {
        console.log(error)
        if (error.status == 401) {
          this.isAuth = false;
          localStorage.removeItem("token")
          window.location.reload()
          // this.router.navigate(["/connexion"])
          console.log("Signin error")
          this.userService.emitUser(null, true);
        }
      })
    }
  }

  signUp(user, appVerifier) {
    let phone = user.tel;
    let that = this;
    auth().signInWithPhoneNumber(phone, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window['confirmationResult'] = confirmationResult;
        that.nextSubject.next({ state: "code sent", confirmationResult: confirmationResult })
      }).catch(function (error) {
        that.nextSubject.next({ state: "error", err: error })

        // console.log("erreur", error)
        // Error; SMS not sent
        // ...
      });
  }

  signInCodeVerification(confirmationResult, code, user) {
    // console.log(user, code, confirmationResult)
    let that = this;
    confirmationResult.confirm(`${code}`).then(function (result) {
      // User signed in successfully.
      user.phone_verified = 1;
      that.saveUser(user, result.user)
      // ...
    }).catch(function (error) {
      that.nextSubject.next({ state: "error", err: error })

      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  saveUser(user, result = null) {
    // let that = this;
    user.firebaseUser = result;
    this.http.post<any>(this.configService.url + this.configService.api + "clients/register", user).subscribe(data => {
      // console.log(data)
      if (data.status && data.status == "error") {
        this.nextSubject.next({ state: "error", err: data.message })
      } else {
        // window["subscribe"](user.id);
        localStorage.setItem("token", data.access_token);
        this.configService.token = data.access_token;
        this.configService.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.access_token
          })
        };
        this.nextSubject.next({ state: "user created", user: user })
        this.isAuth = true;
        this.userService.user = user;
        this.userService.emitUser(user, true);
        if (this.goto) {
          this.router.navigate([this.goto]);
        } else {
          this.router.navigate(['/accueil']);
        }
      }
    }, (error) => {
      console.log(error)
      this.nextSubject.next({ state: "error", err: error.error.message })
    })
  }

  login(user, result = null) {
    let that = this;
    user.firebaseUser = result;
    this.http.post<any>(this.configService.url + this.configService.api + "clients/login", user).subscribe(data => {
      if (data.status && data.status == "error") {
        data.state = "error"
        that.nextSubject.next(data)
      } else {
        // console.log(data)
        user = data.user
        this.isAuth = true;
        localStorage.setItem("token", data.access_token);
        this.configService.token = data.access_token;
        this.configService.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.access_token
          })
        };
        // window["subscribe"](user.id);

        this.navigationService.openSnackBar(`Coucou ${data.user.surname + ' ' + data.user.firstname} ❤`, "FEMER")
        // console.log(this.configService.httpOptions)
        if (user.surname && user.surname.trim() != "") {
          user.name = user.surname
        } else if (user.surname && user.firstname.trim() != "") {
          user.name = user.firstname
        } else {
          user.name = "Vous";
        }
        this.userService.user = user;
        this.userService.emitUser(user, true);
        that.nextSubject.next({ state: "user connected", user: user })
        // window["menu"]()
      }
    }, (err) => {
      that.nextSubject.next({ state: "error server", error: err })
    })
  }

  logout() {
    this.isAuth = false;
    this.userService.user = {};
    this.userService.emitUser(null, true);
    localStorage.removeItem("token")
    this.router.navigate(['/accueil'])
    //window["menu"]()
    //window.location.reload();

  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    if (authToken !== null) {
      this.isAuth = true
    } else {
      this.isAuth = false;
    }
    return this.isAuth
  }
  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
