import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  url = environment.url;
  api = environment.api;
  token = localStorage.getItem("token") ? localStorage.getItem("token") : null

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient, private userService: UserService) {
    if (this.token) {
      this.http.get(this.url + this.api + "user", this.httpOptions).subscribe((data: any) => {
        this.userService.user = data;
        console.log("Config")
        this.userService.emitUser(data);
      }, (err) => {
        if (err.status == 401) {
          localStorage.removeItem("token");
        }
      })
    }
  }
}
