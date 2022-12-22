import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LatestBlogsComponent } from '../latest-blogs/latest-blogs.component';
import { Router } from "@angular/router";
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[LatestBlogsComponent]
})
export class HeaderComponent implements OnInit {

  currentUserName:any;


  constructor(private display:AppComponent,private blogsEdit:LatestBlogsComponent,private router: Router,public authService:AuthServiceService) { }

  ngOnInit(): void {
  }
  homeGOTO()
  {
    this.router.navigate(['/blogsHome'])
  }
  logOut()
  {
    this.authService.logOut().subscribe(()=>{}) ;
    this.router.navigate(['/blogsHome']);
  }
  profile()
  {
    this.router.navigate(['/userProfile']);
  }
 
}
