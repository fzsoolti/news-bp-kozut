import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../loading/loading.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit{
  error!:HttpErrorResponse | null;
  newsFeedPosts!: NewsFeedPost[];
  numOfAllPosts!: number;

  constructor(private newsFeedService: NewsfeedService, private authService: AuthService, private route: ActivatedRoute, private loadingService: LoadingService) {}

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
    this.loadingService.showLoader();
    this.error = null;

    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    this.newsFeedService.getNewsFeedPosts(params).subscribe({
      next: (response) => {
        this.newsFeedPosts = response.data.posts;
        this.numOfAllPosts = response.numOfResults;
        this.loadingService.hideLoader();
      },
      error: (error) => {
        this.error = error;
        this.loadingService.hideLoader();
      },
    });
  }

  get currentUser(){
    return this.authService.user.value;
  }

}
