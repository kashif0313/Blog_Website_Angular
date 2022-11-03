import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { title } from 'process';

@Component({
  selector: 'app-blog-full',
  templateUrl: './blog-full.component.html',
  styleUrls: ['./blog-full.component.css']
})
export class BlogFullComponent implements OnInit {
    public blogId:any='helo';
    blogSingleArray:any[]=[];
    public blogTitle:any;
  constructor(private afm:AngularFirestore) { }
  ngOnInit(): void {
    this.settingBlogId();
  }
 settingBlogId()
 {
    console.log("blogId before = "+this.blogId);
    console.log("gotID   "+this.blogId);
    console.log("blogId  after = "+this.blogId);
    
    //var docRef = this.afm.collection("Blogs").doc(data);

    // docRef.get().subscribe((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //         this.blogId = data;
    //         this.blogTitle = this.blogId
    //         this.blogSingleArray.push(doc.data());

    //         // this.blogSingleArray.forEach((data1)=>
    //         // {
    //         //     this.blogTitle = data1.title;
    //         //     console.log("blogTitle",this.blogTitle);
    //         //     console.log("blogdata",data1);
    //         // });
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // })

 }  
  
}
