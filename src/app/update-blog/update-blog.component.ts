import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  updateBlogId:any;
  blogArray:any[] = [];
  blogArrayID:any[]=[];
  blogArrayGet:any[] = [];
  ab:any;
  updateTitle:any;
  // @Input() updateTitle:any;
  @Input() updateText:any; 
  @Input() imgSrcBlog:any;
  @Input() timeBlog:any;
  @Input() dateBlog:any; 
  @Input() updatePostedBy:any;
  @Input() blogID:any;

  
  file: any;
  constructor(private afm:AngularFirestore,private home:AppComponent,private route:ActivatedRoute) { }

  ngOnInit()  {
    
    this. fillArray();
  }
  fillArray()
  {
    this.updateBlogId = sessionStorage.getItem("uploadEditBlog");
    this.blogArrayID=[];
    this.blogArrayGet=[];
    this.afm.collection("Blogs",ref=>ref.where("id","==", this.updateBlogId)).get().subscribe((ss)=>{
      ss.docs.forEach((doc)=>{
        const doc1 = doc.data();
        const doc2 = doc.id;
        this.blogArrayGet.push(doc1);
         this.blogArrayID.push(doc2);
         console.log("Blog ID = "+this.blogArrayID);
        // this.blogArrayID.push(doc);
      }); 
      
    });
  }
  updateData()
  { this.updateTitle = document.getElementsByClassName(".blogTitle");
  console.log("update text" );
  //   this.afm.collection("Blogs").doc(this.updateBlogId).update({
  //     title: this.updateTitle,
  //     blog:this.updateText,
  //     imageSrc: this.imgSrcBlog
  // });
  // this.home.refreshPage();
  }
  uploadedImage(Data:any)
  {
    this.file = Data.target.files[0];
    this.imgSrcBlog = this.file;
  }
  
}
