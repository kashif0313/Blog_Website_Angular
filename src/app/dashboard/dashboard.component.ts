import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthServiceService } from '../services/auth-service.service';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  blogArrayID: any[] = [];
  blogArray: any[] = [];
  maxChars: string = '...';
  blogID: any;
  deleteBlogId: any;
  deleteBlogTitle: any;
  deleteConfirm = 'none';
  loginUserID: any;

  constructor(
    private home: AppComponent,
    private afm: AngularFirestore,
    private router: Router,
    private upadateBlog: UpdateBlogComponent,
    public authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    // Retrieve and parse data from sessionStorage
    const storedData = sessionStorage.getItem('allTasksData');
    if (storedData) {
      try {
        this.blogArray = JSON.parse(storedData); // Parse the JSON string into an array
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
    // this.loginUserID = sessionStorage.getItem("userActive");
    // console.log("upload ID = "+this.loginUserID);
    // this.blogArrayID=[];
    // this.blogArray=[];
    // this.afm.collection("Blogs",ref=>ref.where("uploadID","==", this.loginUserID)).get().subscribe((ss)=>{
    //   ss.docs.forEach((doc)=>{
    //     const doc1 = doc.data();
    //     const doc2 = doc.id;
    //     this.blogArray.push(doc1);
    //      this.blogArrayID.push(doc2);
    //     // this.blogArrayID.push(doc);

    //   });
    // });
  }
  editBlogdata(data: string) {
    // var temp = this.blogArrayID[data];
    console.log('blogID = ', data);
    this.upadateBlog.updateBlogId = data;
    sessionStorage.setItem('uploadEditBlog', data);
    this.router.navigate(['/EditBlog']);
  }
  // deleteConfirmation(data: number, data1: string) {
  //   this.deleteConfirm = 'block';
  //   this.blogID = this.blogArrayID[data];
  //   this.deleteBlogTitle = data1;
  // }
  // cancelDelete() {
  //   this.deleteConfirm = 'none';
  // }
  // deleteBlogdata() {
  //   this.afm
  //     .collection('Blogs')
  //     .doc(this.blogID)
  //     .delete()
  //     .then(() => {
  //       console.log('Document successfully deleted!');
  //     })
  //     .catch((error) => {
  //       console.error('Error removing document: ', error);
  //     });
  //   this.deleteConfirm = 'none';
  //   this.home.refreshPage();
  // }
  sendingBlogID(data: any) {
    this.router.navigate(['/Blog', data]);
  }

  deleteConfirmation(index: number, title: string) {
    this.deleteConfirm = 'block';
    this.deleteBlogTitle = title;
    this.deleteBlogId = index; // Store the blog ID for deletion
    console.log('blog id == ', this.deleteBlogId);
  }

  cancelDelete() {
    this.deleteConfirm = 'none';
  }

  deleteBlogdata() {
    // Get the blogs from session storage
    const blogs = JSON.parse(sessionStorage.getItem('allTasksData') || '[]');
    // Find the blog with the matching ID
    const matchedBlog = blogs.findIndex(
      (blog: any) => blog.id === this.deleteBlogId
    );
    // Remove the blog with the matching ID
    const updatedBlogs = blogs.filter(
      (blog: any) => blog.id !== this.deleteBlogId
    );

    // Update the session storage with the filtered blogs
    sessionStorage.setItem('allTasksData', JSON.stringify(updatedBlogs));

    // Hide the delete confirmation popup
    this.deleteConfirm = 'none';

    // Optionally, update the local blog array if necessary
    this.blogArray = updatedBlogs;
  }
}
