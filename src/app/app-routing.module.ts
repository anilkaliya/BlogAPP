import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [{path:"", component: PostListComponent},
  {path: 'api/posts', component: PostCreateComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'signin', component:SigninComponent},
  {path:'edit/:postId',component:PostCreateComponent}
  


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
