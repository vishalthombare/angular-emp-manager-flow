import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  SignupForm:FormGroup
  constructor() { }

  ngOnInit(): void {
    this.SignupForm=new FormGroup({
      Email:new FormControl(null,[Validators.email,Validators.required,Validators.minLength(6)]),
      FirstName:new FormControl(null,Validators.required),
      LastName:new FormControl(null,Validators.required),
      Password:new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(6)]),
      Address:new FormControl(null,Validators.required),
      BirthDate:new FormControl(null,Validators.required),
      CompanyName:new FormControl(null,Validators.required)
    })
  }
  Signup(){
    
  }
}
