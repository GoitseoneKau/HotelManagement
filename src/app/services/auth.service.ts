import { computed, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export type user={
  uid?:string,
  firstname:string,
  lastname:string,
  displayName:string,
  displayImage:string,
  email:string,
  phone:string,
  password?:string,
  role:string
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userBehaviourSubject = new BehaviorSubject<user|null>(null)
  currentUser$ = this.userBehaviourSubject.asObservable()
  private loggedBehaviourSubject = new BehaviorSubject<boolean>(false)
  loggedin$ = this.loggedBehaviourSubject.asObservable()
  
  // private profileBehaviourSubject = new BehaviorSubject<any>(null)
  // currentprofile$ = this.profileBehaviourSubject.asObservable()

  constructor(private auth:Auth,private db:Firestore) { 
    this.stateChange()
   
  }

  
  async registerUser(user:user){
    const userCreds = await createUserWithEmailAndPassword(this.auth,user.email,user.password!)
    const userRef = doc(this.db,`users/${userCreds.user.uid}`)
    await setDoc(userRef,({...user,uid:userCreds.user.uid}))
    return userCreds
  }

  async logout(){
    return await signOut(this.auth)
  }

  async signIn(email:string,password:string){
    const creds = await signInWithEmailAndPassword(this.auth,email,password)
    
    return creds
  }

  async signInGoogle(){
    const credentials = await signInWithPopup(this.auth,new GoogleAuthProvider())
    const userRef = doc(this.db,`users/${credentials.user.uid}`)
    let user:user = {
      uid:credentials.user.uid,
      firstname:credentials.user.displayName!.split(" ")[0],
      lastname:credentials.user.displayName!.split(" ")[1],
      displayName:credentials.user.displayName!,
      displayImage:credentials.user.photoURL!,
      email:credentials.user.email!,
      phone:credentials.user.phoneNumber!,
      role:"guest"
    }
    await setDoc(userRef,(user))
    return credentials
  }

  private stateChange(){

    onAuthStateChanged(this.auth,async (user) => {
     
          if(user){
         
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
            // this.userBehaviourSubject.next(user)
            const prof = await this.getprofile()
            this.userBehaviourSubject.next(prof)
            this.loggedBehaviourSubject.next(true)
          }
        
    })
   
  }

  async getprofile(uid?:string){
    const g_uid = uid||this.auth.currentUser?.uid
    try {
      const userDoc = doc(this.db,`users/${g_uid}`)
      const docSnapShot = await getDoc(userDoc)
      const user = docSnapShot.data() as user
       
      return user
  
    } catch (error) {
      console.log(error)
      return null
    }
 
  }



  

  get currentUser():user{
    return this.userBehaviourSubject.value!
  }

  
  

}
