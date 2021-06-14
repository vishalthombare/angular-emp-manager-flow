import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  SignupForm:FormGroup;
  alertforDom:string='';

  constructor(private _registerService: LoginService,
              private _router:Router) { }

  ngOnInit(): void {

    //form Validation
    this.SignupForm=new FormGroup({
      Email:new FormControl(null,[Validators.email,Validators.required,
        Validators.minLength(8),Validators.pattern
        ('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$')]),
      FirstName:new FormControl(null,[Validators.required,
        Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$')]),
      LastName:new FormControl(null,[Validators.required,Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')]),
      Password:new FormControl(null,Validators.required),
      Address:new FormControl(null,[Validators.required,Validators.minLength(4),
        Validators.pattern('^[a-zA-Z]+$')]),
      BirthDate:new FormControl(null,Validators.required),
      CompanyName:new FormControl(null,[Validators.required,Validators.minLength(4)])
    })
  }


// sign up function to send data to server
  Signup(){

    const postBody={
      email:this.SignupForm.value.Email,
      password:this.SignupForm.value.Password,
      first_name:this.SignupForm.value.FirstName,
      last_name:this.SignupForm.value.LastName,
      address:this.SignupForm.value.Address,
      birthdate:this.SignupForm.value.BirthDate,
      companyname:this.SignupForm.value.CompanyName
  }
    if(this.SignupForm.valid){
      console.log("Valid form data")
      this.alertforDom="Sign up Successfully";
      this.SignupForm.reset();      
      
      this._registerService.registerManager(postBody).
        subscribe(
          res=>{
            console.log(res);
            if(res.status==false){
                console.log("Email is allredy used")
            } else{
              console.log("Data Passing is Successed!")
              this._router.navigate(["/login"])
            }
          }),(err)=>{
            console.log("Unable to Pass data"+err);
        };
    }   
    else{
      console.log("Invalid form data try again");
        this.alertforDom="Please Enter Valid Data";
        this.SignupForm.markAllAsTouched()  
    }
  }

}
