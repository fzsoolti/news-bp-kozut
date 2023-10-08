import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);

  constructor() { }

  setDarkMode(){
    this.isDarkMode.next(true);
  }

  setLightMode(){
    this.isDarkMode.next(false);
  }

  getDarkMode(){
    return this.isDarkMode.asObservable();
  }

  getDatkModeValue(){
    return this.isDarkMode.value;
  }
}
