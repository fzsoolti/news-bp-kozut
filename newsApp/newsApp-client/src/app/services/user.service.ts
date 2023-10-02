import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserResponse } from '../models/ResponseModels';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URI = environment.apiUrl+"/users";

  constructor(private http: HttpClient) { }

  getMe(){
    return this.http.get<GetUserResponse>(this.URI+"/me");
  }
}
