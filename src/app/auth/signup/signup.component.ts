import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
form:FormGroup;
  constructor(private authservice:AuthService) {
   
   }

  ngOnInit() {
    this.form =new FormGroup({
      name:new FormControl(null,{validators:[Validators.required,Validators.minLength(4)]}),
      password:new FormControl(null,{validators:[Validators.required, Validators.minLength(10)]})
      });
  }
  onSignUp()
    {
this.authservice.SignUp(this.form.value.name,this.form.value.password);
    }
  

}
