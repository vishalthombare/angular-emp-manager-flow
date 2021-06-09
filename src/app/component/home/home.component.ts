import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signupForm:FormGroup 
  showEditbtn=true; 

  getEmpDataServer;

  constructor(private serverEmpData: CommonService ) { }

  ngOnInit(): void {
    // get data form dom
    this.signupForm=new FormGroup({
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Address: new FormControl(),
      BirthDate: new FormControl(),
      Mobile: new FormControl(),
      City: new FormControl()
    })

    // get data form server
    this.serverEmpData.getEmpDetail().subscribe(
      data=>{
      this.getEmpDataServer=data;
      console.log(data)
      console.log("server data"+this.getEmpDataServer);
    });

  }
  
  editbtn(){
    this.showEditbtn=!this.showEditbtn;
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
    }),(err)=>{
      console.log("Unable to Pass data"+err);
    };
  }



  // emp data update 
  updateEmployee(id){
    this.showEditbtn=!this.showEditbtn;
    
    const postBody={
      first_name:this.signupForm.value.FirstName,
      last_name:this.signupForm.value.LastName,
      address:this.signupForm.value.Address,
      birthdate:this.signupForm.value.BirthDate,
      mobile:this.signupForm.value.Mobile,
      city:this.signupForm.value.City
      }
    this.serverEmpData.updateEmpDetail(id,postBody).subscribe(
      data=>{
        console.log("emp update successfully"+data);
      },(err)=>{
        console.log("unable to update emp"+err)
      }
    )
  }



  // emp data delete 
  deleteEmployee(id){
    this.serverEmpData.deleteEmpDetail(id).subscribe(
      data=>{
        console.log("user deleted successfully"+data);
      },(err)=>{
        console.log("ubable to delete emp"+err)
      }
    )
  }


}
