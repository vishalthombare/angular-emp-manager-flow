import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  constructor() { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      Email:new FormControl(null,[Validators.email,Validators.required,Validators.minLength(6)]),
      Password:new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(6)])
    })
  }

  Login(){
    
  }

}
