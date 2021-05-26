import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  restaurantsSubject = new Subject<any>();
  quartiersSubject = new Subject<any>();
  villesSubject = new Subject<any>();
  UserSubject = new Subject<any>();
  PaymentSubject = new Subject<any>();
  date: number = (localStorage.getItem("date")) ? parseInt(localStorage.getItem("date")) : 0;



  constructor(private http: HttpClient, private configService: ConfigService, private userService: UserService) { }

  getAllCompanies(villeId = localStorage.getItem("ville")) {
    return this.http.get(this.configService.url + this.configService.api + "restaurants/city/" + villeId);
  }

  sendMail({ from, to, subject, message }) {
    return this.http.post(this.configService.mail_url + "/sendmail", {
      from, to, subject, message, host: this.configService.host, user: this.configService.user, password: this.configService.password
    })
  }

  loginShop(id) {
    this.http.get(this.configService.url + this.configService.api + "shops/" + id).subscribe((data: any) => {
      if (data.token) {
        localStorage.setItem("token_shop", data.token)
        this.configService.refreshShopToken();
      }
      console.log("something went wrong", data)
    });
  }

  getCompanyByUrl() {
    // alert(document.location.href)
    //  document.location.href
    let website_url = document.location.href.split("//")[1].split("/")[0]
    let options = "?url="+website_url
    return this.http.get(this.configService.url + this.configService.api + "companies/byurl" + options);
  }

  updateUser() {
    this.http.get<any>(this.configService.url + this.configService.api + "user/" + this.userService.user.id, this.configService.httpOptions).subscribe((data: any) => {
      this.userService.emitUser(data, false)
    });
  }


  getVillesWithRestaurants() {
    return this.http.get(this.configService.url + this.configService.api + "villesAvecRestaurants", this.configService.httpOptions)
  }

  getVilles() {
    let diff = (Date.now()) - this.date;
    if (localStorage.getItem("villes") && diff < 60 * 60 * 24 * 1000) {
      let villes = JSON.parse(localStorage.getItem("villes"))
      this.villesSubject.next(villes)
    } else {
      this.http.get(this.configService.url + this.configService.api + "villes", this.configService.httpOptions).subscribe((villes) => {
        localStorage.setItem("villes", JSON.stringify(villes))
        localStorage.setItem("date", (Date.now()) + "")
        this.villesSubject.next(villes)
      })
    }
  }

  getQuartiers() {

    let diff = (Date.now()) - this.date;
    console.log(diff, this.date)
    if (localStorage.getItem("quartiers") && diff < 60 * 60 * 24 * 1000) {
      let quartiers = JSON.parse(localStorage.getItem("quartiers"))
      this.quartiersSubject.next(quartiers)
    } else {
      this.http.get(this.configService.url + this.configService.api + "quartiers", this.configService.httpOptions).subscribe((quartiers) => {
        localStorage.setItem("quartiers", JSON.stringify(quartiers))
        localStorage.setItem("date", (Date.now()) + "")
        this.quartiersSubject.next(quartiers)
      })
    }

  }

  postReview(restaurant, note, message) {
    // console.log(note, message, restaurant.nom)
    return this.http.post<any>(this.configService.url + this.configService.api + "avis", JSON.stringify({ type: "entreprise", message: message, id: restaurant.id, note: note }), this.configService.httpOptions)
  }

  setPaymentIntent(data) {
    this.http.post<any>(this.configService.url + this.configService.api + "payment_intent", JSON.stringify(data), this.configService.httpOptions).subscribe((data: any) => {
      // console.log(data)
    });
  }

  getProducts(route = undefined, per_page = "&per_page=16", company_id = localStorage.getItem("company_id")) {
    if (!route) {
      route = this.configService.url + this.configService.api + "companies/" + company_id + "/products"
      per_page = "?per_page=16"
    }
    return this.http.get(route + per_page);
  }
  getProduct(id, company_id = localStorage.getItem("company_id")) {
    return this.http.get(this.configService.url + this.configService.api + "companies/" + company_id+ "/products/" + id);
  }

  getCollections(route = undefined, per_page = 16, company_id = localStorage.getItem("company_id")) {
    if (!route) {
      route = this.configService.url + this.configService.api + "companies/" + company_id + "/collections"
    }
    return this.http.get(route + (route.includes("?") ? "&per_page=" : '?per_page=')+per_page);
  }
  getCollection(id, company_id = localStorage.getItem("company_id")) {
    return this.http.get(this.configService.url + this.configService.api + "companies/" + company_id + "/collections/" + id);
  }

  getBlogInfos(company_id = localStorage.getItem("company_id")) {
    return this.http.get(this.configService.url + this.configService.api + "companies/" + company_id + "/blogs/infos");
  }
  getBlogPosts(route = undefined, per_page = "&per_page=5", company_id = localStorage.getItem("company_id")) {
    if (!route) { per_page = "?per_page=5"; route = this.configService.url + this.configService.api + "companies/" + company_id + "/blogs" }
    return this.http.get(route + per_page);
  }
  getBlogPostBySlug(blog_slug = undefined) {
    return this.http.get(this.configService.url + this.configService.api + "companies/blogs/by_slug" + (blog_slug ? '/' + blog_slug : ""));
  }


  getCommands(id = undefined) {
    return this.http.get(this.configService.url + this.configService.api + "clients/commands" + (id ? '/' + id : ""), this.configService.httpOptions);
  }

  getAddresses(id = undefined) {
    return this.http.get(this.configService.url + this.configService.api + "clients/addresses" + (id ? '/' + id : ""), this.configService.httpOptions);
  }

  addAddress(adresse) {
    // console.log(JSON.stringify(adresse))
    adresse.fromApi = true;
    return this.http.post<any>(this.configService.url + this.configService.api + "clients/addresses", adresse, this.configService.httpOptions)
  }

  editAddress(adresse) {
    adresse.fromApi = true;
    return this.http.put<any>(this.configService.url + this.configService.api + "clients/addresses", adresse, this.configService.httpOptions)
  }

  delAddress(adresse) {
    adresse.fromApi = true;
    return this.http.delete<any>(this.configService.url + this.configService.api + "clients/addresses?address_id=" + adresse.id, this.configService.httpOptions)
  }

  checkPassword(password) {
    return this.http.post<any>(this.configService.url + this.configService.api + "clients/checkpassword", { password: password }, this.configService.httpOptions);
  }

  checkDiscountCode(code, cart_subtotal, company_id = localStorage.getItem("company_id")) {
    return this.http.post<any>(this.configService.url + this.configService.api + "companies/discount/check", { code, amount: cart_subtotal, company_id }, this.configService.httpOptionsShop);
  }

  paymentByToken(token, datas) {
    console.log(datas)
    return this.http.post<any>(this.configService.url + this.configService.api + "payment/charge/token/capture", { token: token, currency: datas.currency, amount: datas.totalAmount, description: datas.description }, this.configService.httpOptions)
  }

  paymentIntent({ amount, currency }) {
    if (!currency) {
      currency = "xaf"
    }
    this.http.get<any>(this.configService.url + this.configService.api + "payment_intent/" + amount + "/" + currency.toLowerCase(), this.configService.httpOptions).subscribe((data: any) => {
      this.PaymentSubject.next(data)
    })
  }


  newCommand(command) {
    return this.http.post(this.configService.url + this.configService.api + "commands", { ...command }, this.configService.httpOptions)

  }

  // commandWithBlockchain({amount}){
  //   return this.http.post<any>(this.configService.url + this.configService.api +"wallet/pay/", {amount:amount}, this.configService.httpOptions);
  // }

  updateAddress(adresse) {
    adresse.fromApi = true;
    adresse.quartier_id = adresse.quartier.id;
    // console.log(JSON.stringify(adresse))
    this.http.put<any>(this.configService.url + this.configService.api + "clients/adresse/" + adresse.id + "/update", adresse, this.configService.httpOptions).subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        this.userService.user.adresses = data.quartiers
        this.userService.emitUser()
        this.UserSubject.next({ message: "L'adresse a bien été modifiée" })
      }
    })
  }

  removeAddress(adresse) {
    // console.log(JSON.stringify(adresse))

    this.http.post<any>(this.configService.url + this.configService.api + "clients/adresse/" + this.userService.user.id + "/delete", { fromApi: true, quartier_id: adresse.quartier.id, pivot_id: adresse.id }, this.configService.httpOptions).subscribe((data: any) => {
      // console.log(data)
      if (data.success) {
        this.userService.user.adresses = data.quartiers
        this.userService.emitUser()
        this.UserSubject.next({ message: "L'adresse a bien été supprimée" })
      }
    })
  }

  getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  /**
   * En rapport avec les wallets
   */
  recharge({ final_amount, currency }) {
    // Final_amount est le montant utilisé pour la recharge
    if (!currency) {
      currency = "xaf"
    }
    currency = currency.toLowerCase()
    return this.http.post<any>(this.configService.url + this.configService.api + "wallet/recharge", { fromApi: true, amount: final_amount, currency: currency }, this.configService.httpOptions);
  }

  makeATransfert(identifiant, amount) {
    return this.http.post<any>(this.configService.url + this.configService.api + "wallet/transfert", { fromApi: true, amount: amount, receiver: identifiant.toLowerCase().replace("@", "") }, this.configService.httpOptions);
  }

  checkIdentifiantExist(id) {
    // console.log(this.configService.httpOptions)
    return this.http.get<any>(this.configService.url + this.configService.api + "wallet/checkid/" + id, this.configService.httpOptions)
  }

  // Lance la requete pour l'ouverture d'un compte
  openUserAccount(id) {
    // console.log("Identifiant ", id)
    return this.http.post<any>(this.configService.url + this.configService.api + "wallet/create", { fromApi: true, identifiant: id }, this.configService.httpOptions);
  }

  string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '') // collapse whitespace and replace by -
      .replace(/-+/g, ''); // collapse dashes

    return str;
  }

}
