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
import { CreatePostComponent } from './components/main/news-feed/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsFeedComponent,
    TopNavbarComponent,
    AuthComponent,
    MainComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialDesignModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
