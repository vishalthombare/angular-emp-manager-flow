import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signupForm:FormGroup 
  showEditbtn=true; 
  isEmpty=false;
  successPopup=true;
  popupMsg="";
  popupSucces=""
  refreshFun:Subscription;
  getEmpDataServer:any;

  constructor(private serverEmpData: CommonService,
              public _router:Router, public _location:Location
              ) {}

    openCreatelist(){
      this.successPopup=!this.successPopup;
    }

  ngOnInit(): void {
    
    // Validators
    this.signupForm=new FormGroup({
      FirstName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      LastName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      Address: new FormControl(null,[Validators.required,Validators.minLength(4)]),
      BirthDate: new FormControl(null,Validators.required),
      Mobile: new FormControl(null,[Validators.required,Validators.minLength(10)]),
      City: new FormControl(null,[Validators.required,Validators.minLength(4)])
    })



    // get data form server
    this.serverEmpData.getEmpDetail().subscribe(
      data=>{
      this.getEmpDataServer=data;
      console.log(this.getEmpDataServer);
    });

  }



  // dummy function used for switch 
  editbtn(){
    this.showEditbtn=!this.showEditbtn;
    this.popupMsg="Please Fill the Data!"
    this.successPopup=false;
    this.signupForm.markAllAsTouched();
  }
  dummyFun(){
    this.popupMsg="Error! is empty"
    this.successPopup=false;
    this.signupForm.markAllAsTouched();
  }

  dummySucces(){
    // this.popupMsg="Success!"
    // this.successPopup=false;
  }  

  // page refresh auto
  refresh(){
    const popupModal= interval(3000);
      this.refreshFun=popupModal.subscribe(res=>{
          console.log(res); 
          this._router.navigateByUrl("",{skipLocationChange:true}).then(()=>{
            console.log(decodeURI(this._location.path()));
            this._router.navigate([decodeURI(this._location.path())])
          });
          if(res=1){
            this.refreshFun.unsubscribe()
          }
        });   

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

    this.serverEmpData.postEmpDetail(postBody).subscribe(
    data =>{

      console.log("data pass"+data)
        this.signupForm.reset() 
        this.popupSucces="Add Emp Successfully!"  
        this.successPopup=false;  

    }),(err)=>{
      console.log("Unable to Pass data"+err);
    };
  }



  // emp data update 
  updateEmployee(id){
    this.showEditbtn=!this.showEditbtn;
    
    const updateBody={
      _id:id,
      first_name:this.signupForm.value.FirstName,
      last_name:this.signupForm.value.LastName,
      address:this.signupForm.value.Address,
      birthdate:this.signupForm.value.BirthDate,
      mobile:this.signupForm.value.Mobile,
      city:this.signupForm.value.City
      }
    this.serverEmpData.updateEmpDetail(id,updateBody).subscribe(
      data=>{

        this.signupForm.reset()
        this.popupSucces="Update Successfully!"
        this.successPopup=false;
        console.log("emp update successfully"+data);

      },(err)=>{
        console.log("unable to update emp"+err)
        this.popupMsg="Error! unable to update"
        this.successPopup=false;
      }
    )
  }



  // emp data delete 
  deleteEmployee(id){  
    this.serverEmpData.deleteEmpDetail(id).subscribe(
      data=>{ 
        this.successPopup=false;
        this.popupMsg="Delete Successfully!";
        console.log("user deleted successfully"+data);
      },(err)=>{
        console.log("ubable to delete emp"+err)
      }
    )
  }

}
