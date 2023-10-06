import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  user!: User;
  myPosts!: NewsFeedPost[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getMyDetails();
  }

  getMyDetails(){
    this.userService.getDetailedMe().subscribe({
      next: (res) => {
        this.user = res.data.user;
        this.myPosts = res.data.newsFeedPosts;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
