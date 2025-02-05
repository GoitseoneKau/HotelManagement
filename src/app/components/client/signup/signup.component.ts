import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService, user } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private auth:AuthService,private router:Router){}


  // Method to handle form submission
  onSubmit(form:NgForm) {
  
    const formData = form.control.value as user;
    formData.role ='guest'
    formData.displayImage=''
    formData.displayName= `${formData.firstname} ${formData.lastname}`
  
    this.auth.registerUser(formData).then((data)=>{
      this.router.navigate([''])
    })
    .catch((error)=>console.log(error.message))
   
  
  }
}
