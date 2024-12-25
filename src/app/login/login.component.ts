import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { AuthServiceService } from '../services/auth-service.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authSer: AuthServiceService,
    private router: Router,
    private header: HeaderComponent,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    // Static email and password for testing
    var staticEmail = 'test@example.com';
    var staticPassword = 'password123';

    const signupData = sessionStorage.getItem('signupUser');
    if (signupData) {
      const { email, password } = JSON.parse(signupData);
      staticEmail = email;
      staticPassword = password;
    }
    if (email === staticEmail && password === staticPassword) {
      // Static authentication success simulation
      sessionStorage.setItem('loggedIn', 'success');
      this.toast.success('Logged In Successfully.');
      this.header.logUser = true;
      this.router.navigate(['/blogsHome']).then(() => {
        window.location.reload();
      });
    } else {
      // Static authentication failure simulation
      this.toast.error('Error: Invalid email or password.');
    }

    // Firebase authentication code (commented out)
    /*
    this.authSer.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged In Successfully.',
        loading: 'Logging In .....',
        error: 'Error No user found.',
      })
    )
    .subscribe(() => { 
      this.router.navigate(['/blogsHome']);
    });
    */
  }

  loginAuth() {}
}
