import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', component: NewsFeedComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
