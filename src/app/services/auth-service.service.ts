import { Injectable } from '@angular/core';
import { Auth, authState, idToken, user, } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { UserInfo } from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  $CurrentUser = authState(this.auth);
  userNewId:any;
  userId:any = this.auth.onAuthStateChanged((user) => {if (user) {
   
    this.userNewId = user.uid;
    // ...
  }})

  constructor(private auth:Auth,private afm:AngularFirestore,) { }

  signup(name:string,email:string,password:string)
  {
    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe
    (switchMap(({user})=>updateProfile(user,{displayName:name}))) 
  }
  updateProfileData(profileData:Partial<UserInfo>):Observable<any>
  {
    this.updateDataFirebase(profileData)
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if(!user)
        {
          throw new Error("not activated");
        }
        return updateProfile(user,profileData);
      })
    )
  }
  updateDataFirebase(data:any)
  {
    const  userIdCurrent:any = sessionStorage.getItem("UserCurrentId");
    var washingtonRef = this.afm.collection("/Users").doc(userIdCurrent);
    return washingtonRef.update({
      userImage: data
  })
  }
  login(username:string,password:string)
  {
    return from(signInWithEmailAndPassword(this.auth,username,password))
  }
  logOut()
  {
    return from (this.auth.signOut());
  }
  updateUser()
  {
    var userDetails = this.auth.updateCurrentUser;
    userDetails.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
  }
}
