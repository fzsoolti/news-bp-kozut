import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  error!:HttpErrorResponse | null;
  user!: User;
  myPosts!: NewsFeedPost[];

  constructor(private userService: UserService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.getMyDetails();
  }

  getMyDetails(){
    this.loadingService.showLoader();
    this.error = null;

    this.userService.getDetailedMe().subscribe({
      next: (res) => {
        this.user = res.data.user;
        this.myPosts = res.data.newsFeedPosts;
        this.loadingService.hideLoader();
      },
      error: (err) => {
        this.error = err;
        this.loadingService.hideLoader();
      }
    })
  }

}
