import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { GetBlogComponent } from './get-blog/get-blog.component';
import { LatestBlogsComponent } from './latest-blogs/latest-blogs.component';
import { BlogFullComponent } from './blog-full/blog-full.component';
import { HeaderComponent } from './header/header.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { UploadProfileImgComponent } from './upload-profile-img/upload-profile-img.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    PostBlogComponent,
    GetBlogComponent,
    LatestBlogsComponent,
    BlogFullComponent,
    HeaderComponent,
    UpdateBlogComponent,
    SignupComponent,
    LoginComponent,
    UploadProfileImgComponent,
    UserProfileComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HotToastModule.forRoot(),
  ],
  providers: [UpdateBlogComponent, HeaderComponent, LatestBlogsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
