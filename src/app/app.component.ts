import { Component } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from './services/seo.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NavigationService } from './services/navigation.service';
import { DataService } from './services/data.service';

let deferredPrompt;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular-template';

  constructor(
    private route: ActivatedRoute, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService, private navigationService: NavigationService
    , private dataService : DataService
  ) {


    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      // addBtn.style.display = 'block';
      console.log(e)
      // addBtn.addEventListener('click', (e) => {
      //   // hide our user interface that shows our A2HS button
      //   addBtn.style.display = 'none';
      //   // Show the prompt
      //   deferredPrompt.prompt();
      //   // Wait for the user to respond to the prompt
      //   deferredPrompt.userChoice.then((choiceResult) => {
      //     if (choiceResult.outcome === 'accepted') {
      //       console.log('User accepted the A2HS prompt');
      //     } else {
      //       console.log('User dismissed the A2HS prompt');
      //     }
      //     deferredPrompt = null;
      //   });
      // });
    });

  }


  ngAfterViewInit(): void {
    window["set_bg"]()
    window["set_hero"]()
  }


  ngOnInit() {
    this.navigationService.getCompanyDetails()
    this.dataService.loginShop()
    // this.navigationService.getCompanyDetails().subscribe(company => {

    // });


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
