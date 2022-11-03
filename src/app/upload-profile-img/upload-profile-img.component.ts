import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {getDownloadURL, ref, Storage, uploadBytesResumable} from '@angular/fire/storage'
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { uploadBytes } from 'firebase/storage';
import { concat, concatMap, from, Observable, switchMap } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-upload-profile-img',
  templateUrl: './upload-profile-img.component.html',
  styleUrls: ['./upload-profile-img.component.css']
})
export class UploadProfileImgComponent implements OnInit {
  
  previewAlt:any = "../../assets/profilePreview.png"
  file:any;
  
  constructor(private afm:AngularFirestore,private storage:Storage,public authSer:AuthServiceService,private toast:HotToastService,private router:Router) { }

  ngOnInit(): void {
    
    var print = this.authSer.userNewId;
    console.log("current user " + print);
  }
  submit()
  {
    if(this.file!=null)
      {
        this.uploadImageDatabase().pipe(
          this.toast.observe({
            success:'Image Uploaded',
            loading:'Uploading Image',
            error:'Uploading Error'
          }),concatMap(
            (photoURL)=>this.authSer.updateProfileData({photoURL}))
          ).subscribe(()=>{
          this.router.navigate(['/blogsHome']);
        });
      }
    
  }

  uploadImageDatabase():Observable<string>
  {
    var userID = this.authSer.userNewId;
    var path = "ProfileImages/"+userID;
    const storageRef = ref(this.storage,path);
    const uploadTask = from(uploadBytes(storageRef,this.file));
    // sessionStorage.setItem('UserCurrentId', userID);
    
    return uploadTask.pipe(
      switchMap((result)=>getDownloadURL(result.ref))
      
    )
  }
 
  uploadedImage(Data:any)
  {
    this.file = Data.target.files[0];
    console.log("event file = "+this.file);
    const reader = new FileReader();
        reader.onload = e => this.previewAlt = reader.result;

        reader.readAsDataURL(this.file);
        console.log("event file = "+this.previewAlt);


  }
}
