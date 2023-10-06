import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit{
  newsFeedPosts!: NewsFeedPost[];
  numOfAllPosts!: number;

  constructor(private newsFeedService: NewsfeedService, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const limit = 20;
    const page = 1;

    this.route.queryParams.subscribe(params => {
      if (params["page"] && params["limit"] && +params["limit"] < 51) {
        this.getNewsfeedPosts(params["limit"], params["page"]);
      } else{
        this.getNewsfeedPosts(limit, page);
      }
    });
  }

  private getNewsfeedPosts(limit: number, page: number) {

    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    this.newsFeedService.getNewsFeedPosts(params).subscribe({
      next: (response) => {
        this.newsFeedPosts = response.data.posts;
        this.numOfAllPosts = response.numOfResults;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get currentUser(){
    return this.authService.user.value;
  }

}
