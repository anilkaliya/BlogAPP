import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
form:FormGroup;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.form =new FormGroup({
      name:new FormControl(null,{validators:[Validators.required,Validators.minLength(4)]}),
      password:new FormControl(null,{validators:[Validators.required, Validators.minLength(10)]})
      });
  }
  onSignIn(){
    this.authService.SignIn(this.form.value.name,this.form.value.password);
  }

}
