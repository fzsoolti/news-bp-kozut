import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-feed-post',
  templateUrl: './news-feed-post.component.html',
  styleUrls: ['./news-feed-post.component.css']
})
export class NewsFeedPostComponent {
  @Input() newsFeedPost!: NewsFeedPost;
  imagePrefix = environment.host+"/images";

  constructor(private newsFeedService: NewsfeedService, private router:Router){}

  sanitizeContent(content: string){
    return this.newsFeedService.sanitizeContent(content);
  }


  checkPostDetails(){
    this.router.navigate(["./newsDetail"], {
      queryParams: {id: this.newsFeedPost._id},
    });
  }

}
