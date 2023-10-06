import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFeedComponent } from './components/main/news-feed/news-feed.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { CreateUpdatePostComponent } from './components/main/news-feed/create-update-post/create-update-post.component';
import { UserAuthGuard } from './components/auth/userAuth.guard';
import { PostDetailsComponent } from './components/main/news-feed/post-details/post-details.component';
import { UserDetailsComponent } from './components/main/user/user-details/user-details.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'newsfeed', pathMatch: 'full' },
  { path: '', component: MainComponent,
  children: [
    { path: 'newsfeed', component: NewsFeedComponent},
    { path: 'add', component: CreateUpdatePostComponent, canActivate:[UserAuthGuard] },
    { path: 'update', component: CreateUpdatePostComponent, canActivate:[UserAuthGuard] },
    { path: 'newsDetail', component: PostDetailsComponent},
    { path: 'user', component: UserDetailsComponent},
  ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
