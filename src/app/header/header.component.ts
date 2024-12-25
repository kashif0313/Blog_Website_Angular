import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LatestBlogsComponent } from '../latest-blogs/latest-blogs.component';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LatestBlogsComponent],
})
export class HeaderComponent implements OnInit {
  currentUserName: any;
  logUser: boolean = false;
  name: string = 'admin';

  constructor(
    private display: AppComponent,
    private blogsEdit: LatestBlogsComponent,
    private router: Router,
    public authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('loggedIn');
    const signupData = sessionStorage.getItem('signupUser');
    if (signupData) {
      const { name } = JSON.parse(signupData);
      this.name = name;
    }
    if (sessionStorage.getItem('loggedIn') == 'success') {
      this.logUser = true;
    }
  }
  homeGOTO() {
    this.router.navigate(['/blogsHome']);
  }
  logOut() {
    // this.authService.logOut().subscribe(() => {});
    sessionStorage.removeItem('signup');
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/blogsHome']).then(() => {
      window.location.reload();
    });
  }
  profile() {
    this.router.navigate(['/userProfile']);
  }
}
