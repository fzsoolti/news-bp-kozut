import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
import { User } from './models/User';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user!: User;
  isDarkMode: boolean = false;

  constructor(private authService: AuthService, private darkModeService: DarkmodeService) {}

  ngOnInit(): void {
    this.darkModeSubscription();
    this.authService.autoLogin();
    this.checkDarkMode();
  }

  private darkModeSubscription(){
    this.darkModeService.getDarkMode().subscribe({
      next: (darkModeValue)=>{
        this.isDarkMode = darkModeValue;
      }
    })
  }

  private checkDarkMode(){
    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode) {
      JSON.parse(darkMode) ? this.darkModeService.setDarkMode() : this.darkModeService.setLightMode();
    } else {
      this.darkModeService.setLightMode();
    }
  }

}
