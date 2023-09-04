import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from '../shared/service/SharedService';
import { Constant } from '../shared/constant/Contant';
import { AuthenticateModel } from './model/authenticateModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ServiceName = 'LoginUser';
  ShowLoading = false;
  public loginModel : AuthenticateModel;

  //HIDING THE SHOW BUTTON BY DEFAULT.
  hide = true;
  invalid = false;
  tagLine = "";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  mobileNumber = "";
  otpNumber = "";
  newPassword = "";
  confirmPassword = "";
  validOTPNumber = "";
  isOTP_Validate : boolean = false;

  constructor(private sharedService : SharedService, private router:Router, private toastr: ToastrService,
    private titleService : Title) {
      localStorage.clear(); 
      this.loginModel = new AuthenticateModel();
      this.titleService.setTitle("Login")
    }

  ngOnInit(): void {
    this.getAppUrl();
  }

  getAppUrl(){
    //console.log(this.companyName)
    let jsonData = {
      loginEmpId : ""
    }
    this.sharedService.getAllListBySelectType(jsonData,"portal_color")
    .subscribe( (response) =>{
      let appResponse = response.colorList[0];
      this.loginPage = appResponse.loginPage;
      this.button = appResponse.button;
      this.color1 = appResponse.color1;
      this.color2 = appResponse.color2;
      
      localStorage.setItem("loginPage",this.loginPage);
      localStorage.setItem("button",this.button);
      localStorage.setItem("color1",this.color1);
      localStorage.setItem("color2",this.color2);
  },
    (error)=>{
      
    })
  }

  OnSubmitting() {
    this.ShowLoading = true
    this.sharedService.authenticate(this.loginModel)
    .subscribe( (response) =>{
      this.ShowLoading = false
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          // localStorage.setItem("empId",this.loginModel.username);
          localStorage.setItem("empId",response.wrappedList[0].empId);
          localStorage.setItem("empName",response.wrappedList[0].empName);
          localStorage.setItem("empMobile",this.loginModel.username);
          localStorage.setItem("empRoleId",response.wrappedList[0].empRoleId);
          localStorage.setItem("loginEmpRole",response.wrappedList[0].roleName);
          localStorage.setItem("state",response.wrappedList[0].state);
          localStorage.setItem("tenentId",response.wrappedList[0].tenentId);
          localStorage.setItem(btoa("isValidToken"),btoa(Constant.TRINITY_PRIVATE_KEY));
          this.router.navigate(['/layout']);
        }
        else if(response.responseCode === Constant.NO_RECORDS_FOUND_CODE){
          this.toastr.warning(response.responseDesc, 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        else{
          this.toastr.warning('Invalid Login Credentials...', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("authenticate"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  openForgetPasswordModel(){
    if(this.loginModel.username == ""){
      // alert("enter employee id");
      this.toastr.warning("enter valid mobile no","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      return;
    }
    this.mobileNumber = this.loginModel.username;
    $("#forgetPasswordModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  sendOTP(){
    this.isOTP_Validate = false;
    this.validOTPNumber = "";
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber
    }
    this.ShowLoading = true;
    this.sharedService.sendOTP(json)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.validOTPNumber = response.wrappedList[0];
          this.ShowLoading = false;
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("sendOTPtoMobile"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  VerifyOTP(){
    this.isOTP_Validate = false;
    if(this.otpNumber != this.validOTPNumber){
      alert("enter enter valid otp");
      return;
    }
    this.isOTP_Validate = true;

  }

  changePassword(){
    if(this.newPassword == ""){
      alert("Enter new password");
      return ;
    }
    else if(this.confirmPassword != this.newPassword){
      alert("Password does not match, please re-enter.");
      return;
    }
    this.ShowLoading = true; 
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber,
      newPassword : this.newPassword
    }
    this.sharedService.changePassword(json)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success('password change successfully', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          $("#forgetPasswordModal").modal("hide");
          this.otpNumber = "";
          this.mobileNumber = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.isOTP_Validate = false;
          this.ShowLoading = false;
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("changePassword"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  closeModal(){
    let isConfirm = confirm("Do you want to close?");
    if(isConfirm){
      this.mobileNumber = "";
      this.otpNumber = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.isOTP_Validate = false;
      $("#forgetPasswordModal").modal("hide");
    }
  }

}
