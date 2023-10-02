import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['token']) {
        const exp = params['exp'];
        const token = params['token'];
        this.authService.auth(token, exp);
      }

      this.navigate();
    });
  }

  navigate() {
    this.router.navigate(["/"], {
      queryParams: {},
    });
  }

}
