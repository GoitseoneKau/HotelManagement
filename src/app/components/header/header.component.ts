import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, ResolveStart, Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntil, takeWhile } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  role = signal('')
  named = signal('')
displayname = computed(()=>this.named())
isLoggedin = signal(false)
loggedIn = computed(()=>this.isLoggedin())
  constructor(
    private router:Router,
    private auth:AuthService,
    private route:ActivatedRoute
  ){
    
  }
    

  ngOnInit(){
 
       this.auth.loggedin$.subscribe((res)=>{
        this.isLoggedin.set(res) 
       })
    

  
   
    this.auth.currentUser$.subscribe((user)=>{
     
          this.named.set(`${user?.firstname} ${user?.lastname}`)
          this.role.set(`${user?.role}`)
        
      
    })
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  goToSignup(){
 this.router.navigate(['/signup'])
  }


  logout(){
    this.auth.logout()
    .then(()=>{
      window.location.reload()
    })
    .catch((error)=>console.log(error.message))
  }

}
