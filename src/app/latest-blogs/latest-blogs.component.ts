import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppComponent } from '../app.component';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';
import { AngularFireModule } from '@angular/fire/compat';
import { Router } from '@angular/router';


@Component({
  selector: 'app-latest-blogs',
  templateUrl: './latest-blogs.component.html',
  styleUrls: ['./latest-blogs.component.css']
})
export class LatestBlogsComponent implements OnInit {
  blogArrayID:any[]=[];
  blogArray:any[]=[];
  maxChars:string = "...";
  blogID:any;
  deleteBlogTitle:any;
  deleteConfirm="none";
  @Output() blogId = new EventEmitter<any>(); 
  @Output() editBlog = new EventEmitter<{display:any,blogID:any}>(); 
  imageSource:any;
  
  constructor(private home:AppComponent,private afm:AngularFirestore,private router:Router,private upadateBlog:UpdateBlogComponent) { }

  ngOnInit(): void {
    this.getBlog();    
  }

  getBlog()
  {
    this.blogArrayID=[];
    this.blogArray=[];

    this.afm.collection("Blogs").get().subscribe((ss)=>{
      ss.docs.forEach((doc)=>{
        const doc1 = doc.data();
        const doc2 = doc.id;
        this.blogArray.push(doc1);
         this.blogArrayID.push(doc2);
        // this.blogArrayID.push(doc);
      }); 
    });
  }
  sendId(data:number)
  {    
    
     console.log("blogID = "+data);
     var ab = this.blogArrayID[data];
     //console.log("id array = "+ab);
     this.blogId.emit(ab);
     
  }
  editBlogdata(data:number)
  {
    // var blogID = this.blogArrayID[data];
    // this.upadateBlog.retrivedata(ab);
    // console.log("before homeUpdate = "+this.display.updateBlog)
    // this.display.updateBlog="true";
    // console.log("homeUpdate = "+this.display.updateBlog)
    // var display = "block";
    // this.editBlog.emit({display, blogID});
    this.router.navigate(['/EditBlog',data]);
  }
  deleteConfirmation(data:number,data1:string)
  {
    this.deleteConfirm="block";
     this.blogID = this.blogArrayID[data];
     this.deleteBlogTitle = data1;
  }
  cancelDelete()
  {
    this.deleteConfirm="none";
  }
  deleteBlogdata()
  {
    this.afm.collection("Blogs").doc(this.blogID).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  this.deleteConfirm="none";
  this.home.refreshPage();
  }

  sendingBlogID(data:any)
  {
    this.router.navigate(['/Blog',data])
  }
}
