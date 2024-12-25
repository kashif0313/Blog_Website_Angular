import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(public authSer: AuthServiceService) {}

  staticEmail: string = 'test@example.com';
  staticPassword: string = 'password123';
  staticName: string = 'admin';
  logUser: boolean = false;
  hidePassword = true;
  previewAlt: any = '../../assets/profile/image.png';
  file: any;
  uploadedImageFile: File | null = null;

  ngOnInit(): void {
    // sessionStorage.getItem('UserCurrentId');

    if (sessionStorage.getItem('loggedIn') == 'success') {
      this.logUser = true;
    }
    const signupData = sessionStorage.getItem('signupUser');
    if (signupData) {
      const { name, email, password } = JSON.parse(signupData);
      this.staticEmail = email;
      this.staticPassword = password;
      this.staticName = name;
    }
  }
  submit() {
    this.authSer.updateUser();
  }
  uploadedImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.uploadedImageFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewAlt = reader.result as string;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
}
