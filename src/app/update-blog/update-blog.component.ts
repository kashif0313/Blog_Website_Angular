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
  blogId:any;
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
    this.blogId = this.route.snapshot.paramMap.get('object');
    console.log("Blog ID = "+this.blogId);
    this. fillArray();
  }
  fillArray()
  {
    this.blogArrayID=[];
    this.blogArray=[];
    this.afm.collection("Blogs").get().subscribe((ss)=>{
      ss.docs.forEach((doc)=>{
        const doc1 = doc.data();
        const doc2 = doc.id;
        this.blogArray.push(doc1);
         this.blogArrayID.push(doc2);
         console.log("Blog ID = "+this.blogArrayID);
        // this.blogArrayID.push(doc);
      }); 
      this.getBlogData();
    });
  }
  updateData()
  { this.updateTitle = document.getElementsByClassName(".blogTitle");
  console.log("update text" + this.updateTitle);
  //   this.afm.collection("Blogs").doc(this.blogID).update({
  //     title: this.updateTitle,
  //     blog:this.updateText,
  //     imageSrc: this.imgSrcBlog
  // });
  this.home.updateBlog = "none";
  this.home.latestBlog = "inline-block";
  this.home.refreshPage();
  }
  uploadedImage(Data:any)
  {
    this.file = Data.target.files[0];
    this.imgSrcBlog = this.file;
  }
  getBlogData()
  {
    
    // console.log("ab Blog ID = "+this.blogId);
     this.ab = this.blogArrayID[this.blogId];
    // console.log("Blog ID ab = "+this.ab); 
    var docRef = this.afm.collection("Blogs").doc(this.ab);
    console.log("doc id "+this.ab);
    console.log("docRef"+docRef);
docRef.get().subscribe((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        this.blogArrayGet.push(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })
 
  }
}
