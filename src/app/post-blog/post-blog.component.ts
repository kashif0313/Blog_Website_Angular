import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { uploadBlog } from './upload';
import {getDownloadURL, ref, Storage, uploadBytesResumable} from '@angular/fire/storage'
import { AppComponent } from '../app.component';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent implements OnInit {
  postPopup="block";
  blogTitle="";
  blog="";
  blogImage="../../assets/preview.jpg";
  uploadDate="";
  uploadTime="";
  uploadBy="";
  uploading="";
  uploadingProgress="none";
  uploadBlog:uploadBlog={
    id:"",
    title:"",
    blog:"",
    imageSrc:"",
    uploadBy:"",
    date:"",
    time:""
  }
  file: any;
  UploadingProgress: number=0;

  constructor(private afm:AngularFirestore,private storage:Storage,private home:AppComponent,private router:Router) { }

  ngOnInit(): void {
  }

  resetData()
  {
    this.blogTitle="";
  this.blog="";
  this.blogImage="../../assets/preview.jpg";
  this.file="";
  this.UploadingProgress=0;
  this.uploading = "";
  this.uploadTime = "";
  this.uploadDate = "";
  this.home.addBlog = "none";
  this.home.refreshPage();
  }
  uploadedImage(Data:any)
  {
    this.file = Data.target.files[0];
  }
  uploadBlogData(uBlog:uploadBlog)
  {
    //uBlog.id = this.afm.createId();
    uBlog.id = this.uploadDate+"-"+this.blogTitle;
    //console.log("collection id = "+uBlog.id);
    const returnCollection = this.afm.collection('/Blogs').add(uBlog);
    this.resetData();
    return returnCollection;
    
  }
  collectData()
  {
    this.uploading = "../assets/74H8.gif";
    this.uploadBlog.title = this.blogTitle;
    this.uploadBlog.blog = this.blog;
    this.uploadBlog.imageSrc = this.blogImage;
    this.uploadBlog.uploadBy = this.uploadBy;
    this.uploadBlog.date = this.uploadDate;
    this.uploadBlog.time = this.uploadTime;

    const storageRef = ref(this.storage,this.file.name);
    const uploadTask = uploadBytesResumable(storageRef ,this.file);
    uploadTask.on('state_changed',
    (snapshot)=>
    {
      this.uploadingProgress="inline-block";
      var  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      this.UploadingProgress = progress;
    },
    (error)=>
    {
      alert(error.message);
    },
    ()=>
    {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        this.uploadBlog.imageSrc = downloadURL;
        this.uploadBlogData(this.uploadBlog);
       
        this.uploadingProgress="none";
      });
  }
    )
    
  }
  closeAddBlog()
  {
    this.postPopup = "none";
    this.router.navigate(['/blogsHome']);
  }
}
