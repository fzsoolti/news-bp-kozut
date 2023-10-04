import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  user!: User;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.testFunc();
    this.getMe();
  }

  private getMe() {
    this.userService.getMe().subscribe({
      next: (response) => {
        this.user = response.data.user;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private testFunc(){
    console.log(this.authService.user.value);
  }

}
