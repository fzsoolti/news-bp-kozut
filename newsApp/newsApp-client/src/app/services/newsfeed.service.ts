import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetNewsfeedPostResponse } from '../models/ResponseModels';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  private URI = environment.apiUrl+"/news";

  constructor(private http: HttpClient) { }

  createNewsFeedPost(newsfeedPost: FormData){
    return this.http.post<GetNewsfeedPostResponse>(`${this.URI}`, newsfeedPost);
  }
}
