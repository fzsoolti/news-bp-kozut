import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  user!: User;
  error!:HttpErrorResponse|null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getMe();
  }

  private getMe() {
    this.error = null;

    if (this.authService.user.value) {
      this.userService.getMe().subscribe({
        next: (response) => {
          this.user = response.data.user;
        },
        error: (error) => {
          this.error = error;
        },
      });
    }
  }

}
