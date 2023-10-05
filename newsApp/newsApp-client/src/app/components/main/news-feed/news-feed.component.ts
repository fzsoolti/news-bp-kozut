import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit{
  newsFeedPosts!: NewsFeedPost[];

  constructor(private newsFeedService: NewsfeedService, private authService: AuthService) {}

  ngOnInit(): void {
    const limit = 20;
    const page = 1;
    this.getNewsfeedPosts(limit, page);
  }

  private getNewsfeedPosts(limit: number, page: number) {

    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    this.newsFeedService.getNewsFeedPosts(params).subscribe({
      next: (response) => {
        this.newsFeedPosts = response.data.posts;
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
