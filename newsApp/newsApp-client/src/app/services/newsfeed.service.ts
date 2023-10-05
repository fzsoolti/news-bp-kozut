import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetNewsfeedPostResponse } from '../models/ResponseModels';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  private URI = environment.apiUrl+"/news";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  createNewsFeedPost(newsfeedPost: FormData){
    return this.http.post<GetNewsfeedPostResponse>(`${this.URI}`, newsfeedPost);
  }

  getNewsFeedPostById(id: string){
    return this.http.get<GetNewsfeedPostResponse>(`${this.URI}/`+id);
  }

  sanitizeContent(content: string) {
    if (content) {
      return this.sanitizer.bypassSecurityTrustHtml(content.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    }
    return '';
  }
}
