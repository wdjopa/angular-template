import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

  company: any;
  user: any;
  commandes: any;


  constructor(private userService: UserService, private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
    this.navigationService.emitCompany();

    this.userService.userSubject.subscribe(user => {
      this.user = user;
      console.log(this.user)
      this.commandes = this.user.commandes.filter(command => command.entreprise_id === this.company.id)
    });
  }

  JSONParse(data) {

    let a = JSON.parse(data)
    return a

  }

}
