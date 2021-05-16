import { Component, OnInit } from '@angular/core';
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
  companySubscription: Subscription;
  userSubscription: Subscription;
  postSubscription: Subscription;
  blogSubscription: Subscription;
  blog: any = {};
  pagination: any = {};
  constructor(private userService: UserService, private navigationService: NavigationService, private dataService: DataService) {

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
