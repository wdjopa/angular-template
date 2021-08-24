import { Component, ElementRef } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from './services/seo.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NavigationService } from './services/navigation.service';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';
import { CanonicalService } from './shared/canonical.service';

let deferredPrompt;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular-template';

  companySubscription: Subscription;
  company: any;
  constructor(
    private route: ActivatedRoute, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService, private navigationService: NavigationService
    , private dataService: DataService, private elRef: ElementRef,
    private canonicalService: CanonicalService

  ) {
    this.companySubscription = this.navigationService.companySubject.subscribe((company:any) => {
      if (company) {
        this.company = company
        this.updateCustomProperties()
        this.dataService.loginShop(company.id)

      }
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      // addBtn.style.display = 'block';
      // console.log(e)
      // addBtn.addEventListener('click', (e) => {
      //   // hide our user interface that shows our A2HS button
      //   addBtn.style.display = 'none';
      //   // Show the prompt
      //   deferredPrompt.prompt();
      //   // Wait for the user to respond to the prompt
      //   deferredPrompt.userChoice.then((choiceResult) => {
      //     if (choiceResult.outcome === 'accepted') {
      //       // console.log('User accepted the A2HS prompt');
      //     } else {
      //       // console.log('User dismissed the A2HS prompt');
      //     }
      //     deferredPrompt = null;
      //   });
      // });
    });

    this.navigationService.getCompanyDetails()
  }

  updateCustomProperties() {
    let color = this?.company?.datas?.settings?.theme?.color || "#f68b48";
    let google_fonts = this?.company?.datas?.settings?.theme?.google_fonts || [];
    let custom_font_url = this?.company?.datas?.settings?.theme?.custom_font_url;
    let font = this?.company?.datas?.settings?.theme?.font;
    // this.elRef.nativeElement.style.setProperty("$main-color", "red")
    window["set_styles"](`
      ${google_fonts.map(url => {
      return '@import url(' + url + ');';
    }).join("")}

      ${custom_font_url ? `
       @font-face {
        font-family: '${font}';
        src: url("${custom_font_url}");
      }
      ` : ''}

      .font-customer {
        font-family: "${font}", montserrat,sans-serif !important;
        color: ${color} !important;
      }

      .section-title span {
        font-family:  "${font}", montserrat,sans-serif !important;
      }

      .basket-content::after {
        background: ${color};
      }

      .basket-box {
        color: ${color};
        box-shadow: 0px 0px 2px 5px ${color};
      }
      .testimonial {
        background: ${color}1a;
      }
      .cart__total {
        background: ${color}1a;
      }
      .checkout__order {
        background: ${color}1a;
      }
      .class__sidebar {
        background: ${color}1a;
      }
      .blog__details__author {
        background: ${color}1a;
      }
      .class {
        background-color: ${color}1a;
      }
      .text-accent {
        color: ${color} !important;
      }
      .paymentModeLogo:hover {
        border-color: ${color}55 !important;
      }
      .paymentModeLogo.active {
        opacity: 1;
        border-color: ${color} !important;
      }
      .select_address.active {
        border-color: ${color} !important;
      }
      .select_address:hover {
        border-color: ${color} !important;
      }
      .section-title span {
        color: ${color};
      }
      .primary-btn {
        background-color: ${color};
      }
      .header {
        background-color: ${color};
      }
      .header__menu ul li.active a {
        color: ${color};
      }
      .header__menu ul li:hover a {
        color: ${color};
      }
      .hero__text:after {
        border: 1px dashed ${color};
      }
      .categories__item:after {
        border: 1px solid ${color};
        border-color: transparent ${color} ${color} transparent;
      }
      .categories__item:hover {
        background-color: ${color};
      }
      .categories__item__icon span {
        color: ${color};
      }
      .class__video .play-btn {
        background-color: ${color};
      }
      .product__item:hover .product__item__pic .product__label span {
        background-color: ${color};
      }
      .product__item:hover .product__item__text .product__item__price {
        color: ${color} !important;
      }
      .product__item__text .cart_add span {
        border-bottom: 2px solid ${color};
      }
      .footer__newslatter form button {
        color: ${color};
      }
      .copyright__text i {
        color: ${color};
      }
      .copyright__text a {
        color: ${color};
      }
      .about__video .play-btn {
        background-color: ${color};
      }
      .product__details__option a.heart__btn {
        color: ${color};
      }
      .coupon__code span {
        color: ${color};
      }
      .checkout__input p span {
        color: ${color};
      }
      .checkout__input__checkbox label input:checked~.checkmark {
        border-color: ${color};
      }
      .checkout__input__checkbox label .checkmark:after {
        border: solid ${color};
      }
      .checkout__total__all li span {
        color: ${color};
      }
      .class__item:hover .class__item__pic .label {
        background-color: ${color};
      }
      .class__item__text .read_more {
        color: ${color}; 
      }
      .blog__item__pic .blog__pic__inner .label {
        background-color: ${color};
      }
      .blog__item__text a {
        border-bottom: 2px solid ${color};
      }
      .blog__sidebar__item h5:before {
        background-color: ${color}4d;
      }
      .blog__sidebar__item .blog__sidebar__item__categories ul li:hover a span {
        color: ${color};
      }
      .blog__sidebar__item form label input:checked~.checkmark {
        border-color: ${color};
      }
      .blog__sidebar__item form label .checkmark:after {
        border: solid ${color};
      }
      .blog__details__print .primary-btn {
        border: 1px solid ${color};
      }
      /* Wide Mobile = 480px */
      @media only screen and (max-width: 767px) {
        .canvas__open {
          color: ${color};
        }
  }
    `)
    window["update_logo"](this?.company?.logo)
    // console.log("set property", this.elRef.nativeElement.style)
  }

  ngAfterViewInit(): void {
    window["set_bg"]()
    window["set_hero"]()
  }


  ngOnInit() {
    this.canonicalService.setCanonicalURL();


    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    )
      .subscribe((event) => {
        this.seoService.updateTitle(event['title']);
        this.seoService.updateOgUrl(event['ogUrl']);
        this.seoService.updateOgImage(event['ogImage']);
        //Updating Description tag dynamically with title
        this.seoService.updateDescription(event['title'] + event['description'])
      });
  }

  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, 0);
          // window.scrollTo(0, pos-50); // animation how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 0);
    }
  }
}
