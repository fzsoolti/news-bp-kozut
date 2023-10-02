import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFeedComponent } from './components/main/news-feed/news-feed.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: MainComponent,
  children: [
    { path: 'landing', component: NewsFeedComponent},
  ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
