import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  company: any;
  user: any;
  posts: any = [];
  postSubscription: Subscription;
  companySubscription: Subscription;
  userSubscription: Subscription;
  blogSubscription: Subscription;
  blog: any = {};
  pagination: any = {};
  constructor(private userService: UserService, private navigationService: NavigationService, private dataService: DataService, private titleService : Title, private metaTagService : Meta) {

    this.companySubscription = this.navigationService.companySubject.subscribe(company => {
      if (company) {
        this.company = company
        this.titleService.setTitle("Blogs | " + company.name);
        this.metaTagService.addTags([
          { name: 'description', content: 'Commandez nos produits | ' + company.name + ". " + company.description },
          { name: 'keywords', content: 'Ecommerce, Genuka, ' + company.name.split(" ").join(", ") + company.description.split(" ").join(", ") },
          { name: 'og:title', content: company.name },
          { name: 'og:image', content: company.medias[0].link },
          { name: 'date', content: company.created_at, scheme: 'YYYY-MM-DD' },
          { name: 'og:description', content: 'Consultez nos articles de blogs' },
          { name: 'robots', content: 'index, follow' },
          { name: 'author', content: 'Genuka.com' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'og:site_name', content: company.name },
          { name: 'og:url', content: window.location.href },
        ]);
      }
      this.userService.refreshUser()
    });

    this.userSubscription = this.userService.userSubject.subscribe(user => {
      this.user = user;
    });
  }


  ngOnInit(): void {
    this.getBlogPosts()
    this.getBlogInfos()
  }

  getBlogPosts(route = undefined){
    this.postSubscription = this.dataService.getBlogPosts(route).subscribe((response: any) => {
      this.posts = response.data.map(post => {
        return {...post, url : 'url('+(post.medias.length > 0 ? post.medias[0].link : '')+')'}
      });
      this.pagination = { "links": response.links, "meta": response.meta, "total_pages": new Array(response.meta.last_page).fill(0).map((_, i)=> i+1)};
    })
  }

  getBlogInfos(){
    this.blogSubscription = this.dataService.getBlogInfos().subscribe((response: any) => {
      response.tags = Object.keys(response.tags).map(tag_slug => {
        return response.tags[tag_slug]
      })
      this.blog = response;
    })
  }
  
  ngOnDestroy() {
    if (this.companySubscription)
      this.companySubscription.unsubscribe();
    if (this.postSubscription)
      this.postSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
    if (this.blogSubscription)
      this.blogSubscription.unsubscribe();
  }

}
