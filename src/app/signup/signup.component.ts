import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from './users';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export function passMatched():ValidatorFn
{
  return (control:AbstractControl):ValidationErrors | null =>
  {
    const pass = control.get('password')?.value;
    const passConfirm = control.get('passwordConfirm')?.value;
    if(pass && passConfirm && pass!==passConfirm)
    {
      return{passwordsDontMatch : true}
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
user$ = this.authSer.$CurrentUser;


  signupForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    passwordConfirm: new FormControl(''),
    dob: new FormControl(''),
  },
    {validators:passMatched()}
  );
  users:Users={
    id:"",
    name:"",
    email:"",
    userImage:""
  }

  constructor(private afm:AngularFirestore,public authSer:AuthServiceService,private router:Router,private toast:HotToastService) { }

  ngOnInit(): void {
  }
  get name()
  {
    return this.signupForm.get('name');
  }
  get password()
  {
    return this.signupForm.get('password');
  }
  get email()
  {
    return this.signupForm.get('email');
  }
  get passConf()
  {
    return this.signupForm.get('passwordConfirm');
  }
  submit()
  {
    
    if(!this.signupForm.valid)
      {
        return;
      }
    const { name,email ,password} = this.signupForm.value;
    this.authSer.signup(name,email,password).pipe
      ( this.toast.observe({
        success:'You are successfully signed up',
        loading:'Signing - in',
        error:'error'
      })
    ).subscribe(()=>{
      this.authSer.$CurrentUser;
      this.addToDatabase();
      this.router.navigate(['/userProfileImg']);
    })

  }
  async addToDatabase()
  {
    const { name,email ,dob} = this.signupForm.value;
    this.users.name = name;
    this.users.email = email;
    const returnCollection = await this.afm.collection('/Users').add(this.users);
    const collId = returnCollection.id;
    sessionStorage.setItem('UserCurrentId', collId);
    return returnCollection;
  }
  

}
