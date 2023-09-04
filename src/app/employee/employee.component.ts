import { Component, OnInit } from '@angular/core';
import { Constant } from '../shared/constant/Contant';
import { CommonFunction } from '../shared/service/CommonFunction';
import { EmployeeTableSetting } from '../shared/tableSettings/EmployeeTableSetting';
import { Router } from '@angular/router';
import { SharedService } from '../shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../layout/layout.component';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  alertFadeoutTime = 0;
  roleList = [];
  selectedRoleList = [];
  rmIdList = [];
  selectedRmIdList = [];
  employeeList = [];
  employeeCode = "";
  employeeName = "";
  mobile = "";
  emailId = "";
  stateList = [];
  selectedStateList = [];
  stateHqList = [];
  selectedStateHqList = [];
  isAdmin : boolean = false;
  isRM : boolean = false;
  isSH : boolean = false;
  isFieldUser : boolean = false;
  
  editSelectedRoleList = [];
  editEmployeeName = "";
  editMobile = "";
  editEmailId = "";
  editSelectedStateList = [];
  editIsFieldUser : boolean = false;
  editSelectedRmIdList = [];

  isDoAnyChange : boolean = true;
  newSetting = EmployeeTableSetting.setting
  employeeTableSettings = EmployeeTableSetting.setting;
  tenentId = "";
  loginEmpId = "";
  loginEmpRole = "";
  button = "";
  color1 = "";
  color2 = "";
  columnKeyArr = [];
  columnTitleArr = [];
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService, private layoutComponent : LayoutComponent) { 
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
      this.layoutComponent.setPageTitle("Employee");
    }

  ngOnInit() {
    this.multiSelectdropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
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
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    this.getDynamicColumn(this.router.url.split("/")[2]);
    this.getStateCityAreaList("state");
    this.getAllList();
    this.getAllEmployeeList();
    //this.updateRouterSequence();
  }
  onSelectOrDeselectRole(item){
    this.isAdmin = false;
    this.isRM = false;
    this.isSH = false;
    $(".forSH").hide(100,function(){
      $(".forNonSH").show();
    })
    if(this.selectedRoleList.length !=0){
      let roleId = CommonFunction.createCommaSeprate(this.selectedRoleList);
      if(roleId == "1"){
        this.isAdmin = true;
        this.selectedRmIdList = [];
      }
      else if(roleId == "3"){
        this.isRM = true;
        this.selectedRmIdList = [];
      }
      else if(roleId == "4"){
        this.isSH = true;
        this.selectedRmIdList = [];
        $(".forNonSH").hide(100,function(){
          $(".forSH").show();
        })
      }
    }
    
  }

  onSelectOrDeselectEditRole(item){
    this.isAdmin = false;
    this.isRM = false;
    this.isSH = false;
    $(".edit_forSH").hide(100,function(){
      $(".edit_forNonSH").show();
    })
    if(this.editSelectedRoleList.length !=0){
      let roleId = CommonFunction.createCommaSeprate(this.editSelectedRoleList);
      if(roleId == "1"){
        this.isAdmin = true;
        this.selectedRmIdList = [];
      }
      else if(roleId == "3"){
        this.isRM = true;
        this.selectedRmIdList = [];
      }
      else if(roleId == "4"){
        this.isSH = true;
        this.selectedRmIdList = [];
        $(".edit_forNonSH").hide(100,function(){
          $(".edit_forSH").show();
        })
      }
    }
    
  }

  onSelectOrDeselectState(item){
    this.stateHqList = [];
    this.selectedStateHqList = [];
    if(this.selectedStateList.length !=0){
      let state =  CommonFunction.createCommaSeprate(this.selectedStateList);
      this.getStateHqList(state);
    }
    
  }

  getDynamicColumn(routerLink : string){
    let dynCol = [];
    this.columnKeyArr = [];
    this.columnTitleArr = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
      menuId : routerLink
    }
    this.sharedService.getAllListBySelectType(jsonData,"dynamicColumn")
    .subscribe((response) =>{
      //console.log(response);
      dynCol = response.dynamicColumn;
      for(let i=0;i<dynCol.length;i++){
        this.newSetting.columns[dynCol[i].columnKey] = {title:dynCol[i].columnTitle,width:dynCol[i].columnWidth};
        this.columnKeyArr.push(dynCol[i].columnKey);
        this.columnTitleArr.push(dynCol[i].columnTitle);
      }
      this.employeeTableSettings = Object.assign({}, this.newSetting);
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getDynamicColumn"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  getStateHqList(stateName : string){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      tenentId : this.tenentId,
      state : stateName,
    }
    this.sharedService.getAllListBySelectType(jsonData,'stateHqList')
    .subscribe((response)=>{
      this.stateHqList = response.stateHqList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getStateHqList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }
  
  getStateCityAreaList(searchType : any){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      tenentId : this.tenentId,
      searchType : searchType,
    }
    // this.layoutComponent.ShowLoading = true;
    this.sharedService.getAllListBySelectType(jsonData,searchType)
    .subscribe((response) =>{
      // console.log(response);
     
      if(searchType == 'state'){
        let stateResponse = response.state;
        let tempStateList = [];
        for(let i=0;i<stateResponse.length;i++){
          let stateJson = {
            paramCode : stateResponse[i],
            paramDesc : stateResponse[i]+" "
          }
          tempStateList.push(stateJson);
        }
        this.stateList = tempStateList;
      }
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getStateCityAreaList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }
  makeBlank(fieldId){
    $(fieldId).val("");
  }
  updateRouterSequence(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      currentRouter : this.router.url
    }
    this.sharedService.updateDataByUpdateType(jsonData,'routerSequence')
    .subscribe((response) =>{
      // console.log(response);
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("updateRouterSeq"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  getAllList(){
    this.sharedService.getAllList("employee", this.tenentId)
    .subscribe((response) =>{
      // console.log(response);
      this.roleList = response.roleList;
      this.rmIdList = response.rmIdList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllList"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  getAllEmployeeList(){
    this.employeeList = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getAllListBySelectType(jsonData,"employee")
    .subscribe((response) =>{
      // console.log(response);
      this.employeeList = response.employeeList;
      this.layoutComponent.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllEmployeeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  submitEmployeeData(){
    if(this.employeeCode == ""){
      this.toastr.warning("please enter employeeCode","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    if(this.employeeName == ""){
      this.toastr.warning("please enter employeeName value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.mobile == ""){
      this.toastr.warning("please enter mobile value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.mobile.length != 10){
      this.toastr.warning("mobile length should be 10 digit","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.emailId == ""){
      this.toastr.warning("please enter email id","Alert !", {timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(!this.validateEmailid(this.emailId)){
      this.toastr.warning("please enter valid email id","Alert !", {timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.selectedRoleList.length == 0){
      this.toastr.warning("please select one role","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(!(this.isAdmin || this.isRM || this.isSH) && this.selectedRmIdList.length == 0){
      this.toastr.warning("please select one RM ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(!(this.isAdmin) && this.selectedStateList.length == 0){
      this.toastr.warning("please select one state","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(!(this.isAdmin || this.isSH) && this.selectedStateHqList.length == 0){
      this.toastr.warning("please select one HQ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }

    let roleIds = CommonFunction.createCommaSeprate(this.selectedRoleList);
    let states = CommonFunction.createCommaSeprate(this.selectedStateList);
    let statesHQ = CommonFunction.createCommaSeprate(this.selectedStateHqList);
    let rmId = CommonFunction.createCommaSeprate(this.selectedRmIdList);

    let jsonData = {
      employeeCode :this.employeeCode,
      employeeName : this.employeeName,
      roleId : roleIds,
      mobile : this.mobile,
      state : states,
      hq : statesHQ,
      emailId : this.emailId,
      rmId : rmId,
      tenentId : this.tenentId
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.insertDataByInsertType(jsonData, "employee")
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.setDefaultAllField();
        this.getAllEmployeeList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.layoutComponent.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitEmployeeData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  setDefaultAllField(){
    this.employeeCode = "";
    this.employeeName = ""
    this.mobile = "";
    this.emailId = "";
    this.selectedRoleList = [];
    this.selectedRmIdList = [];
    this.selectedStateList = [];
    this.stateHqList = [];
    this.selectedStateHqList = [];
    
    this.isFieldUser = false;

    this.editableEmployeeId = "";
    this.editEmployeeName = ""
    this.editSelectedRoleList = [];
    this.editSelectedRmIdList = [];
    this.editMobile = "";
    this.editIsFieldUser = false;
    this.isRM = false;
    this.isAdmin = false;
    this.isSH = false;
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'activerecord':
        this.actionOnEmployee(event,1);
        break;
     case 'deactiverecord':
        this.actionOnEmployee(event,0);
        break;
      case 'editrecord':
        this.editEmployee(event);
        break;
    }
  }

  actionOnEmployee(event,action){
    let actionType = action == 1 ? "Activate" : "Deactivate";
    let isConfirm = confirm("Do you want to "+actionType+" this?");
    if(isConfirm){
      let id = event.data.id;
      let jsonData = {
        "id" : id,
        "action" : action
      }
      this.layoutComponent.ShowLoading = true;
      this.sharedService.updateDataByUpdateType(jsonData,"employee")
      .subscribe((response) =>{
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
          this.getAllEmployeeList();
        }
        else{
          this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        }
        this.layoutComponent.ShowLoading = false;
        
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("actionOnEmployee"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.layoutComponent.ShowLoading = false;
      });
    }
  }

  editableEmployeeId = "";
  editableId = "";
  editEmployee(event){
    this.isDoAnyChange = true;
    this.isAdmin = false;
    this.isRM = false;
    this.isSH = false;
   
    this.editSelectedRoleList = [];
    this.editSelectedRmIdList = [];
    this.editableId = event.data.id;
    this.editableEmployeeId = event.data.empId;
      for(let i=0;i<this.employeeList.length;i++){
        let iid = this.employeeList[i].id;
        if(iid == this.editableId){
          this.editEmployeeName = this.employeeList[i].empName;
          this.editMobile = this.employeeList[i].mobile;
          this.editEmailId = this.employeeList[i].emailId;
          let roleId = this.employeeList[i].roleId;
          if(roleId == "1"){
            this.isAdmin = true;
          }
          else if(roleId == "3"){
            this.isRM = true;
          }
          else if(roleId == "4"){
            this.isSH = true;
          }

          if(roleId == "4"){
            $(".edit_forNonSH").hide(100,function(){
              $(".edit_forSH").show();
            })
          }
          else{
            $(".edit_forSH").hide(100,function(){
              $(".edit_forNonSH").show();
            })
          }
          
          for(let j=0;j<this.roleList.length;j++){
            let roleIdParamCode = this.roleList[j].paramCode;
            if(roleIdParamCode == roleId){
              this.editSelectedRoleList.push(this.roleList[j]);
              break;
            }
          }
          let rmId = this.employeeList[i].rmId;
          for(let j=0;j<this.rmIdList.length;j++){
            let rmIdParamCode = this.rmIdList[j].paramCode;
            if(rmIdParamCode == rmId){
              this.editSelectedRmIdList.push(this.rmIdList[j]);
              break;
            }
          }
          this.editIsFieldUser = this.employeeList[i].fieldUser == 1 ? true : false;
          let empState = this.employeeList[i].state;
          let stateList = empState.split(",")
          let editStateList = [];
          for(let i=0; i<stateList.length;i++){
            let st = stateList[i];
            let editStateJson = {
              paramCode : st,
              paramDesc : st+" "
            }
            editStateList.push(editStateJson);
          }
          this.editSelectedStateList = editStateList;
          break;
        }
      }

      //console.log(this.editSelectedRoleList);

      $("#editEmployeeModal").modal({
        backdrop : 'static',
        keyboard : false
      });
    }

    closeModal(){
      if(!this.isDoAnyChange){
        let isConfirm = confirm("Do you want to close?");
        if(isConfirm){
          $("#editEmployeeModal").modal("hide");
        }
      }
      else{
        $("#editEmployeeModal").modal("hide");
      }
      
    }

    editEmployeeData(){
      if(this.editEmployeeName == ""){
        this.toastr.warning("please enter employeeName value","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(this.editSelectedRoleList.length == 0){
        this.toastr.warning("please select one role","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(this.editMobile == ""){
        this.toastr.warning("please enter mobile value","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(this.editMobile.length != 10){
        this.toastr.warning("mobile length should be 10 digit","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(this.editEmailId == ""){
        this.toastr.warning("please enter email id","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(!this.validateEmailid(this.editEmailId)){
        this.toastr.warning("please enter valid email id","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(!(this.isAdmin) && this.editSelectedStateList.length == 0){
        this.toastr.warning("please select one state","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else if(!(this.isAdmin || this.isRM || this.isSH) && this.editSelectedRmIdList.length == 0){
        this.toastr.warning("please select one RM","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }

      let isConfirm = confirm("Do you want to save new  info ?");
      if(!isConfirm){
        return ;
      }
      let roleIds = CommonFunction.createCommaSeprate(this.editSelectedRoleList);
      let states = CommonFunction.createCommaSeprate(this.editSelectedStateList);
      let rmId = CommonFunction.createCommaSeprate(this.editSelectedRmIdList);

    let jsonData = {
      employeeId : this.editableEmployeeId,
      employeeName : this.editEmployeeName,
      roleId : roleIds,
      mobile : this.editMobile,
      emailId : this.editEmailId,
      rmId : rmId,
      state : states,
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.updateDataByUpdateType(jsonData,"editEmployee")
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        $("#editEmployeeModal").modal("hide");
        this.setDefaultAllField();
        this.getAllEmployeeList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.layoutComponent.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("editEmployeeData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  exportData(reportType : any){
    // var time = new Date();
    // let millisecond = Math.round(time.getTime()/1000);

    // let jsonData = {
    //   loginEmpId : this.loginEmpId,
    //   loginEmpRole : this.loginEmpRole,
    //   tenentId : this.tenentId,
    //   reportType : reportType,
    //   millisecond : millisecond
    // }
    // window.open(Constant.phpServiceURL+'downloadReport.php?jsonData='+JSON.stringify(jsonData));
    CommonFunction.downloadFile(this.employeeList,
      'Employee.csv', 
      this.columnKeyArr, 
      this.columnTitleArr)
  }

  validateEmailid(emailIdValue : any){
    var email = emailIdValue;
    var atpos=email.indexOf("@");
    var dotpos=email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
    {		
        return false;
    }
    else
    {
        return true;
    }
  }
  
  closeAnyModal(modalName){
    $("#"+modalName).modal("hide");
  }
  changeSelected(e){
    $("#createEmployeeModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }
 
}
