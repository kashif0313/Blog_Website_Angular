import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { allBlogsData } from './helper/sampleData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'blogPosting';
  getBlogData: any;
  abcd: any;
  blogArray: any[] = [];
  single: any;
  fullBlog = 'none';
  latestBlog = 'inline-block';
  addBlog = 'none';
  updateBlog = 'none';
  updateBlogID: any;
  ngOnInit(): void {
    // this.blogArray = [];
    this.getBlog();
  }

  constructor(private afm: AngularFirestore, private cdr: ChangeDetectorRef) {}

  getBlog() {
    this.blogArray = [];
    if (!sessionStorage.getItem('allTasksData')) {
      sessionStorage.setItem('allTasksData', JSON.stringify(allBlogsData));
    }
    // this.afm.collection("Blogs").get().subscribe((ss)=>{
    //   ss.docs.forEach((doc)=>{
    //     this.blogArray.push(doc.data());
    //   });
    // });
  }

  blogData(data12: any) {
    this.blogArray = [];
    var docRef = this.afm.collection('Blogs').doc(data12);

    docRef.get().subscribe((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        this.blogArray.push(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
    this.fullBlog = 'block';
    this.latestBlog = 'none';
    // console.log("data ID  = "+data12);
    // this.single = data12;
    // this.bComp.blogId=data12;
    // console.log(this.bComp.blogId)
    //console.log("data Template  = ");
  }
  refreshPage() {
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }
  enableEdit(data: any, data1: any) {
    this.blogArray = [];
    this.latestBlog = 'none';
    this.updateBlog = data.display;
    this.updateBlogID = data1.blogID;
    // console.log("data value = "+data.display)
    // console.log("data1 value = "+data1.blogID)
    var docRef = this.afm.collection('Blogs').doc(data1.blogID);

    docRef.get().subscribe((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        this.blogArray.push(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  }
}
