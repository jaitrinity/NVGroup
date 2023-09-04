import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../layout/layout.component';
import { Constant } from '../shared/constant/Contant';
import { CommonFunction } from '../shared/service/CommonFunction';
import { SharedService } from '../shared/service/SharedService';
import { AttendanceTableSetting } from '../shared/tableSettings/AttendanceTableSetting';
declare var $: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  filterStartDate = "";
  filterEndDate = "";
  attandanceList = [];
  attendanceTableSettings = AttendanceTableSetting.setting;
  loginEmpId = "";
  loginEmpRole = "";
  loginEmpState = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService, private layoutComponent : LayoutComponent) { 
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.loginEmpState = localStorage.getItem("state");
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
      this.layoutComponent.setPageTitle("Attendance");
    }

  ngOnInit(): void {
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    this.getAttendanceList();
  }

  getAttendanceList(){
    this.attandanceList = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      loginEmpState : this.loginEmpState,
      filterStartDate : this.filterStartDate,
      filterEndDate : this.filterEndDate,
      tenentId : this.tenentId
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getAllListBySelectType(jsonData,'attendance')
    .subscribe((response) =>{
      //console.log(response);
      this.attandanceList = response.attendanceList;
      this.layoutComponent.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAttendanceList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  exportData(){
    if(this.attandanceList.length != 0 ){
      let columnKeyArr = ["name","attendanceDate","inDateTime","outDateTime","workingHours"];
      let columnTitleArr = ["Name","Date","In Date Time","Out Date Time","Working Hours"];
      CommonFunction.downloadFile(this.attandanceList,
        'Attendance_Report.csv', 
        columnKeyArr, 
        columnTitleArr)
    }
    else{
      alert("No data for export");
    }
  }

}
