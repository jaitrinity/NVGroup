import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../layout/layout.component';
import { Constant } from '../shared/constant/Contant';
// import { CommonFunction } from '../shared/service/CommonFunction';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  fromDate = "";
  toDate = "";
  alertFadeoutTime = 0;
  loginEmpId = "";
  loginEmpRole = "";
  loginEmpState = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  singleSelectdropdownSettings = {};
 
  constructor(private datePipe : DatePipe,private toastr: ToastrService, private layoutComponent : LayoutComponent) { 
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRole = localStorage.getItem("loginEmpRole");
    this.loginEmpState = localStorage.getItem("state");
    let empRoleId = localStorage.getItem("empRoleId");
    
    this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
    this.tenentId = localStorage.getItem("tenentId");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
    this.layoutComponent.setPageTitle("Report");
  }

  ngOnInit(): void {
    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection : true
    };
   
    
    // console.log(this.monthList)
  }

  downloadReport(reportType : number){
    var time = new Date();
    let millisecond = Math.round(time.getTime()/1000);
   
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      loginEmpState : this.loginEmpState,
      fromDate : this.fromDate,
      toDate : this.toDate,
      tenentId : this.tenentId,
      reportType : reportType,
      millisecond : millisecond
    }
    window.open(Constant.phpServiceURL+'downloadReport.php?jsonData='+JSON.stringify(jsonData));
  }

}
