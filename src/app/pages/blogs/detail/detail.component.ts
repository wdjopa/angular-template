import { Component, OnInit } from '@angular/core';
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


  constructor(private userService: UserService, private navigationService: NavigationService, private configService: ConfigService,private dataService: DataService, private route: ActivatedRoute) {
  
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
