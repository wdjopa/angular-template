import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = {};
  userSubject = new Subject<any>()
  constructor() { }

  emitUser(user: any = null, auth = false) {
    if (user) {
      this.user = user;
    }
    this.user.auth = auth
    this.userSubject.next(this.user)
  }

  refreshUser(){
    this.userSubject.next(this.user)
  }

}
