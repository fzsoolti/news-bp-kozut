import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private router: Router) { }

  auth(token: string, expiresAt: number){
    const expirationDate = new Date(
      new Date(expiresAt * 1000)
    );

    const user = new User(
      token,
      expirationDate
    );

    this.user.next(user);

    this.autoLogout(new Date(expiresAt * 1000).getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(user.token));
  }

  autoLogin() {
    const userData: {
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() =>{
      this.logout();
    }, expirationDuration)
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

}
