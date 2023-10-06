import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { User } from 'src/app/models/User';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{
  newsFeedPost!: NewsFeedPost;
  imagePrefix = environment.host+"/images";
  currentUser!: User;

  constructor(private route: ActivatedRoute, private newsFeedService: NewsfeedService, private userService: UserService, private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.getMe();
      this.getPostById(params["id"]);
    });
  }

  getPostById(postId: string){
    this.loadingService.showLoader();

    this.newsFeedService.getNewsFeedPostById(postId).subscribe({
      next: (res) => {
        this.newsFeedPost = res.data.post;
        this.loadingService.hideLoader();
      },
      error: (err) => {
        console.log(err);
        this.loadingService.hideLoader();
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

  navigateToUpdate(){
    this.router.navigate(["/update"], {
      queryParams: {postId: this.newsFeedPost._id},
    });
  }

  sanitizeContent(content: string){
    return this.newsFeedService.sanitizeContent(content);
  }

  onDeletePost(){
    this.newsFeedService.deleteNewsFeedPostById(this.newsFeedPost._id).subscribe({
      next:() => {
        this.router.navigate(["./"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
