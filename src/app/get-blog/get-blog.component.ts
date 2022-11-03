import { Component, Input, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-get-blog',
  templateUrl: './get-blog.component.html',
  styleUrls: ['./get-blog.component.css']
})
export class GetBlogComponent implements OnInit {
  blogId:any;
  ab:any;
  @Input() titleBlog:any;
  @Input() textBlog:any; 
  @Input() imgSrcBlog:any;
  @Input() timeBlog:any;
  @Input() dateBlog:any; 
  @Input() byBlog:any;
  constructor(private route:ActivatedRoute,private afm:AngularFirestore) { }

  
  blogArray:any[] = [];
  blogArrayID:any[]=[];
  blogArrayGet:any[] = [];
  ngOnInit() {
    // this.route.params.subscribe(
    //   params=>{
    //      this.blogId = params;
    //     console.log("Blog param = "+params);
    //     console.log("Blog ID = "+this.blogId);
    //   });
    
     this.blogId = this.route.snapshot.paramMap.get('object');
     console.log("Blog ID = "+this.blogId);
     this.fillArray();
     
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
