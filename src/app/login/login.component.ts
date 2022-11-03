import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSer:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  get email()
  {
    return this.loginForm.get('email');
  }
  get password()
  {
    return this.loginForm.get('password');
  }
  submit()
  {
    if(!this.loginForm.valid)
    {
      return;
    }
    const { email ,password} = this.loginForm.value;
    this.authSer.login(email,password).subscribe(()=>
    { this.router.navigate(['/blogsHome']);
  });
  }
  loginAuth()
  {}
}
