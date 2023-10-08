import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit{
  @Input() user!: User;
  isDarkMode!:boolean;

  constructor(private authService: AuthService, private darkModeService: DarkmodeService) {}

  ngOnInit(): void {
    this.checkDarkMode();
  }

  signInWithGoogle(){
    window.location.href = environment.host+"/auth";
  }

  onLogout(){
    this.authService.logout();
  }

  private checkDarkMode(){
    this.isDarkMode = this.darkModeService.getDatkModeValue();
  }

  setDarkMode(){
    this.isDarkMode = true;
    localStorage.setItem('isDarkMode', JSON.stringify(true));
    this.darkModeService.setDarkMode();
  }

  setLightMode(){
    this.isDarkMode = false;
    localStorage.setItem('isDarkMode', JSON.stringify(false));
    this.darkModeService.setLightMode();
  }

}
