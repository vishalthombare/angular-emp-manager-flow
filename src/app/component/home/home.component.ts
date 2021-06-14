import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { employee } from 'src/app/shared/model/employee';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  signupForm:FormGroup
  isEmpty:boolean=false;
  successPopup:boolean=true;
  popupMsg:string="";
  popupSucces:string=""
  refreshFun:Subscription;
  getEmployeeData:employee;
  todayDate:Date= new Date();

  constructor(private _employeeService: EmployeeService,
                public _router:Router,
                public _location:Location,
                private _loginService:LoginService
              ){}

    openCreatelist(){
      this.successPopup=!this.successPopup;
    }

  ngOnInit(): void {
    
    // Validators
    this.signupForm=new FormGroup({
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')]),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')]),
      Address: new FormControl(null,[Validators.required,Validators.minLength(4),
        Validators.pattern('^[a-zA-Z]+$')]),
      BirthDate: new FormControl(null,[Validators.required]),
      Mobile: new FormControl(null,[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.minLength(10),Validators.maxLength(10)]),
      City: new FormControl(null,[Validators.required,Validators.minLength(4),
        Validators.pattern('^[a-zA-Z]+$')])
    })    
    console.log(this.todayDate);


    // get data form server
    this._employeeService.getEmpDetail().
      subscribe(
        (data:any)=>{
          this.getEmployeeData=data.data;
          console.log(this.getEmployeeData);
      });

  }

  // logged Out Manager
  loggedOut(){
     this._loginService.loggedOut()
  }

  // dummy function used for switch 
  editbtn(item){
    this.popupMsg=undefined;
    this.popupSucces="Edit above fileds!"
    this.successPopup=false;
    console.log(item.birthdate)

  this.signupForm.patchValue({
    FirstName:item.first_name,
    LastName:item.last_name,
    Address:item.address,
    BirthDate:item.birthdate,
    Mobile:item.mobile,
    City:item.city
  })

  }
  dummyFun(){
    this.popupSucces=undefined;
    this.popupMsg="Error! is empty"
    this.successPopup=false;
    this.signupForm.markAllAsTouched();
  }  

  // page refresh auto
  refresh(){

    // const popupModal= interval(3000);
    //   this.refreshFun=popupModal.
    //     subscribe(res=>{
    //       console.log(res); 
    //         this._router.navigateByUrl("",{skipLocationChange:true}).then(()=>{
    //           console.log(decodeURI(this._location.path()));
    //           this._router.navigate([decodeURI(this._location.path())])
    //         });          
    //       if(res>=0){
    //         this.refreshFun.unsubscribe()
    //       }
    //     });

        setTimeout(()=>{
          this._router.navigateByUrl("",{skipLocationChange:true}).then(()=>{
            console.log(decodeURI(this._location.path()));
            this._router.navigate([decodeURI(this._location.path())])
          }); 
        },2000)
  }


  // data pass to server
  addEmployee(){      
   const postBody={
        first_name:this.signupForm.value.FirstName,
        last_name:this.signupForm.value.LastName,
        address:this.signupForm.value.Address,
        birthdate:this.signupForm.value.BirthDate,
        mobile:this.signupForm.value.Mobile,
        city:this.signupForm.value.City
    }
    
    if(this.signupForm.valid){
      console.log("form is Valid");
      this._employeeService.postEmpDetail(postBody).
      subscribe(
        data =>{
          console.log("data pass",data);
            this.refresh()
            this.signupForm.reset() 
            this.popupMsg=undefined;
            this.popupSucces="Add Emp Successfully!"  
            this.successPopup=false;  
        }),(err)=>{
          console.log("Unable to Pass data"+err);
      };
    } else{
      console.log("form is invalid");
    }
    
  }



  // emp data update 
  updateEmployee(id){    
    const updateBody={
        _id:id,
        first_name:this.signupForm.value.FirstName,
        last_name:this.signupForm.value.LastName,
        address:this.signupForm.value.Address,
        birthdate:this.signupForm.value.BirthDate,
        mobile:this.signupForm.value.Mobile,
        city:this.signupForm.value.City
      }
    this._employeeService.updateEmpDetail(id,updateBody).
      subscribe(
        data=>{      
          console.log("emp update successfully",data);
            this.refresh()        
            this.signupForm.reset()
            this.popupSucces="Update Successfully!"
            this.popupMsg=undefined;
            this.successPopup=false;
      },(err)=>{
          console.log("unable to update emp"+err)
            this.popupMsg="Error! unable to update"
            this.successPopup=false;
      }
    )
  }



  // emp data delete 
  deleteEmployee(id){
    this._employeeService.deleteEmpDetail(id).
      subscribe(
        data=>{ 
          console.log("Emp deleted successfully",data);
            this.refresh()
            this.successPopup=false;
            this.popupSucces=undefined;
            this.popupMsg="Delete Successfully!";        
      },(err)=>{
         console.log("ubable to delete emp"+err)
      }
    )
  }


  ngOnDestroy(){

  }

}
