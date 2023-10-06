import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent {
  @Input() error: HttpErrorResponse  | null = null;
  @Input() infoMessage: string = "";
  @Input() closeable: boolean | null = false;

  get errorMessage(){
    if (this.error) {
      switch(this.error.status){
        case 0: return "Nincs kapcsolat a szerverrel. Próbáld újra később!"
      }
      return this.error.error.message;
    }
  }
}
