import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFeedComponent } from './components/main/news-feed/news-feed.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { CreatePostComponent } from './components/main/news-feed/create-post/create-post.component';
import { UserAuthGuard } from './components/auth/userAuth.guard';
import { PostDetialsComponent } from './components/main/news-feed/post-detials/post-detials.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'newsfeed', pathMatch: 'full' },
  { path: '', component: MainComponent,
  children: [
    { path: 'newsfeed', component: NewsFeedComponent},
    { path: 'add', component: CreatePostComponent, canActivate:[UserAuthGuard] },
    { path: 'newsDetail', component: PostDetialsComponent},
  ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
