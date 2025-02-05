import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private auth:AuthService,private router:Router){}


  // Method to handle form submission
  onSubmit(form:NgForm) {
  
    const formData = form.control.value;
    console.log(formData)
    // Send the form data to the API
    this.auth.signIn(formData.email,formData.password)
    .then(()=>this.router.navigate(['']))
    .catch((error)=>console.log(error.message))
  
}

}
