import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  storage = environment.storage;
  url = environment.url;
  mail_url = environment.mail_url;
  host = environment.host;
  user = environment.user;
  password = environment.password;
  api = environment.api;
  companyId = environment.company_id;
  token = localStorage.getItem("token") ? localStorage.getItem("token") : null
  token_shop = localStorage.getItem("token_shop") ? localStorage.getItem("token_shop") : null

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };
  httpOptionsShop = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token_shop
    })
  };

  constructor(private http: HttpClient, private userService: UserService) {
    if (this.token) {
      this.http.get(this.url + this.api + "clients", this.httpOptions).subscribe((data: any) => {
        this.userService.user = data;
        // // console.log("Config")
        this.userService.emitUser(data);
      }, (err) => {
        if (err.status == 401) {
          localStorage.removeItem("token");
        }
      })
    }
  }

  refreshToken() {
    this.token = localStorage.getItem("token") ? localStorage.getItem("token") : null
  }
  refreshShopToken() {
    this.token_shop = localStorage.getItem("token_shop") ? localStorage.getItem("token_shop") : null
  }
}
