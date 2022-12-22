import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  constructor(public authSer:AuthServiceService) { }

  ngOnInit(): void {
    sessionStorage.getItem('UserCurrentId');
  }
  submit()
  {
    this.authSer.updateUser()
  }
  uploadedImage(data:any)
  {

  }
}
