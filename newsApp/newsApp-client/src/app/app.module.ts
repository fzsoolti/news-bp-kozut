import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialDesignModule } from './modules/material-design/material-design.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewsFeedComponent } from './components/main/news-feed/news-feed.component';
import { TopNavbarComponent } from './components/main/top-navbar/top-navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { MainComponent } from './components/main/main.component';
import { CreateUpdatePostComponent } from './components/main/news-feed/create-update-post/create-update-post.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDetailsComponent } from './components/main/news-feed/post-details/post-details.component';
import { NewsFeedPostComponent } from './components/main/news-feed/news-feed-post/news-feed-post.component';
import { NewsPaginatorComponent } from './components/main/news-feed/news-paginator/news-paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsFeedComponent,
    TopNavbarComponent,
    AuthComponent,
    MainComponent,
    CreateUpdatePostComponent,
    PostDetailsComponent,
    NewsFeedPostComponent,
    NewsPaginatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialDesignModule,
    QuillModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
