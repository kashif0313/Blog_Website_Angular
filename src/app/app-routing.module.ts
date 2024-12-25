import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GetBlogComponent } from './get-blog/get-blog.component';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { LoginComponent } from './login/login.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { UploadProfileImgComponent } from './upload-profile-img/upload-profile-img.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const redirectToLogin = () => redirectUnauthorizedTo(['loginPage']);
const redirectToHome = () => redirectLoggedInTo(['Home']);

const routes: Routes = [
  { path: 'signUpPage', component: SignupComponent },
  // {path: 'loginPage', component: LoginComponent ,...canActivate(redirectToHome)},
  { path: 'loginPage', component: LoginComponent },
  { path: 'Home', component: AppComponent },
  { path: 'Blog/:object', component: GetBlogComponent },
  { path: 'addBlog', component: PostBlogComponent },
  { path: 'blogsHome', component: LatestBlogsComponent },
  // {path: 'userProfile', component: UserProfileComponent,...canActivate(redirectToLogin) },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'EditBlog', component: UpdateBlogComponent },
  { path: 'userProfileImg', component: UploadProfileImgComponent },
  { path: 'dashboardPage', component: DashboardComponent },
  { path: '', redirectTo: 'blogsHome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
