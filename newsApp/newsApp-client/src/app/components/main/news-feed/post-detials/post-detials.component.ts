import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { User } from 'src/app/models/User';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-detials',
  templateUrl: './post-detials.component.html',
  styleUrls: ['./post-detials.component.css']
})
export class PostDetialsComponent implements OnInit{
  newsFeedPost!: NewsFeedPost;
  imagePrefix = environment.host+"/images";
  currentUser!: User;

  constructor(private route: ActivatedRoute, private newsFeedService: NewsfeedService, private userService: UserService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.getMe();
      this.getPostById(params["id"]);
    });
  }

  getPostById(postId: string){
    this.newsFeedService.getNewsFeedPostById(postId).subscribe({
      next: (res) => {
        this.newsFeedPost = res.data.post;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getMe(){
    this.userService.getMe().subscribe({
      next: (res) => {
        this.currentUser = res.data.user;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sanitizeContent(content: string){
    return this.newsFeedService.sanitizeContent(content);
  }

}
