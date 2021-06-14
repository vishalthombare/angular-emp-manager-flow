import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  alertforDom:string="";

  loginMngData={
    email:"",
    password:""
  }

  constructor(private _loginService: LoginService,
             private _router:Router) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      Email:new FormControl(null,[Validators.email,Validators.required,
        Validators.minLength(8),Validators.pattern
        ('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]),
      Password:new FormControl(null,[Validators.required])
    })
    
  }

  Login(){
    const postBody={
      email:this.loginForm.value.Email,
      password:this.loginForm.value.Password,
    }    
    if(this.loginForm.valid){
      console.log("login form is valid");
      this.loginForm.reset()
      
      this._loginService.loginManager(postBody).
      subscribe(
        (res:any)=>{
          // debugger
          console.log("token",res);
          if(res.token!==undefined){
            localStorage.setItem('token',res.token);
            this._router.navigate(['/home'])
          }          
        }),(err=>{
          console.log("unable to pass data"+err);
        })
    }
    else{      
      this.alertforDom="Please Enter Valid Credential";
      console.log("login form is Invalid");
      this.loginForm.markAllAsTouched();
    }
  }

}
