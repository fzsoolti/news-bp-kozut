import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  @Input() user!: User;

  constructor(private authService: AuthService) {}

  signInWithGoogle(){
    window.location.href = environment.host+"/auth";
  }

  onLogout(){
    this.authService.logout();
  }

}
