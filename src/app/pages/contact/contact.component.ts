import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  companySubscription: Subscription;
  company: any;
  response: boolean;
  loading: boolean = false;


  constructor(private navigationService: NavigationService, private dataService: DataService, private configService: ConfigService) {
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
    });
  }

  ngOnInit(): void {
    this.navigationService.emitCompany()
  }


  OnSubmit(form: NgForm) {
    this.loading = true;
    const { name, email, message } = form.value;
    this.dataService.sendMail({
      from: "Website Contact <" + this.configService.user + ">", to: this.company.email, subject: "Contact Page", message: `
      <p>
      Hello ${this.company.name}, 
      <br/>
      Vous avez reçu un message de la part de ${name}. Son email est : ${email}.
      <br/>
      Message : ${message}
      </p>
    ` }).subscribe((a: any) => {
        if (a.status) {
          this.response = true
          form.reset()
        }
        this.loading = false;

      }, (err) => {
        this.loading = false;
        window.open('https://wa.me/' + this.company.tel + "?text=" + message, "_blank");
      })
    // let _message = `Bonjour, je souhaite organiser un évènement avec vous. Je m'appelle ${name} et ce sera le ${date}. Vous pourrez me contacter au : ${tel}. Quelques précisions : ${precisions}`
  }


}
