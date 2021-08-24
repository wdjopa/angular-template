import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  company: any;
  user: any;
  post: any = {};
  companySubscription: Subscription;
  userSubscription: Subscription;
  postSubscription: Subscription;

  storage_url: string;


  constructor(private userService: UserService, private navigationService: NavigationService, private titleService: Title, private metaTagService: Meta, private configService: ConfigService, private dataService: DataService, private route: ActivatedRoute) {

    this.storage_url = this.configService.storage;
    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
      }
      this.userService.refreshUser()
    });

    this.userSubscription = this.userService.userSubject.subscribe(user => {
      this.user = user;
    });
  }


  ngOnInit(): void {
    let blog_slug = this.route.snapshot.params['blog_slug'];
    this.route.params.subscribe(params => {
      blog_slug = params['blog_slug'];
      this.getBlogPost(blog_slug)
      // this.initialiseState(); // reset and set based on new parameter this time
    });
    this.navigationService.emitCompany();

  }

  getBlogPost(blog_slug) {
    this.postSubscription = this.dataService.getBlogPostBySlug(blog_slug).subscribe((post: any) => {
      post.url = 'url(' + (post.medias.length > 0 ? post.medias[0].link : '') + ')'
      this.post = post;
      this.titleService.setTitle("Blog - " + post.title);
      this.metaTagService.addTags([
        { name: 'description', content: post.title + " - " + post.properties.resume },
        { name: 'keywords', content: 'Ecommerce, Genuka, Blogging, ' + post.title.split(" ").join(", ") + post.properties.resume.split(" ").join(", ") },
        { name: 'og:title', content: post.title },
        { name: 'og:image', content: post.medias[0].link },
        { name: 'date', content: post.created_at, scheme: 'YYYY-MM-DD' },
        { name: 'og:description', content: 'Consultez notre catalogue de produits' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: post.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'og:site_name', content: post.title },
        { name: 'og:url', content: window.location.href },
      ]);
    })
  }

  ngOnDestroy() {
    if (this.companySubscription)
      this.companySubscription.unsubscribe();
    if (this.postSubscription)
      this.postSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

}
