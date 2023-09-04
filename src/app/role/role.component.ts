import { Component, OnInit, Inject } from '@angular/core';
import { RoleTableSetting } from '../shared/tableSettings/RoleTableSetting';
import { SharedService } from '../shared/service/SharedService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../shared/constant/Contant';
import { CommonFunction } from '../shared/service/CommonFunction';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LayoutComponent } from '../layout/layout.component';
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  
  alertFadeoutTime = 0;
  roleName = "";
  menuList = [];
  selectedMenuList = [];
  // verifierRoleList = [];
  // selectedVerifierRoleList = [];
  // approverRoleList = [];
  // selectedApproverRoleList = [];
  roleList = [];
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  roleTableSettings = RoleTableSetting.setting;
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService, private layoutComponent : LayoutComponent,
    public dialog: MatDialog) { 
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
      this.layoutComponent.setPageTitle("Role");
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
    
    
    this.getAllList();
    this.getAllRoleList();
    //this.updateRouterSequence();
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
    this.sharedService.getAllList('role', this.tenentId)
    .subscribe((response) =>{
      // console.log(response);
      this.menuList = response.menuList;
      // this.verifierRoleList = response.roleList;
      // this.approverRoleList = response.roleList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllList"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  getAllRoleList(){
    this.roleList = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      tenentId : this.tenentId
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getAllListBySelectType(jsonData,"role")
    .subscribe((response) =>{
      //console.log(response);
      this.roleList = response.roleList;
      this.layoutComponent.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllRoleList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  submitRoleData(){
    if(this.roleName == ""){
      this.toastr.warning("please enter role ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    // else if(this.selectedMenuList.length == 0){
    //   this.toastr.warning("please select menu","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
   
    let menuIds = this.selectedMenuList.length == 0 ? "" : CommonFunction.createCommaSeprate(this.selectedMenuList);
    // let verifierRole = this.selectedVerifierRoleList.length == 0 ? "" : CommonFunction.createCommaSeprateByParamDesc(this.selectedVerifierRoleList);
    // let approvalRole = this.selectedApproverRoleList.length == 0 ? "" : CommonFunction.createCommaSeprateByParamDesc(this.selectedApproverRoleList);
    

    let jsonData = {
      tenentId : this.tenentId,
      roleName : this.roleName,
      menuId : menuIds
      // verifierRole : verifierRole,
      // approvalRole : approvalRole
    }
    //console.log(JSON.stringify(jsonData))
    this.layoutComponent.ShowLoading = true;
    this.sharedService.insertDataByInsertType(jsonData,"role")
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.roleName = "";
        this.selectedMenuList = [];
        this.getAllRoleList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.layoutComponent.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitRoleData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  actionOnRole(event){
    let isConfirm = confirm("Do you want to delete this role?");
    if(isConfirm){
      let roleId = event.data.roleId;
      let jsonData = {
        "roleId" : roleId
      }
      this.layoutComponent.ShowLoading = true;
      this.sharedService.updateDataByUpdateType(jsonData,'roleDelete')
      .subscribe((response) =>{
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
          this.getAllRoleList();
        }
        else{
          this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        }
        this.layoutComponent.ShowLoading = false;
        
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("actionOnRole"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.layoutComponent.ShowLoading = false;
      });
    }
    
  }

  closeModal(){
    if(!this.isDoAnyChange){
      let isConfirm = confirm("Do you want to close?");
      if(isConfirm){
        $("#editRoleModal").modal("hide");
      }
    }
    else{
      $("#editRoleModal").modal("hide");
    }
  }

  editableSelectedMenuList = [];
  // editableSelectedVerifierRoleList = [];
  // editableSelectedApproverRoleList = [];
  isDoAnyChange : boolean = true;
  editableRoleId = "";
  editRole(event){
    this.isDoAnyChange = true;
    this.editableSelectedMenuList = [];
    // this.editableSelectedVerifierRoleList = [];
    // this.editableSelectedApproverRoleList = [];
    this.editableRoleId = event.data.roleId;
    let verifierRole = event.data.verifierRole;
    let approverRole = event.data.approverRole;
    let menuIdStr = event.data.menuId;
    let menuListArr = menuIdStr.split(",");
    for(let i=0;i<this.menuList.length;i++){
      let loopMenuId = this.menuList[i].paramCode;
      let indexOf = menuListArr.indexOf(loopMenuId);
      if(indexOf >= 0){
        this.editableSelectedMenuList.push(this.menuList[i]);
      }
    }

    // let tempVerifierRoleList = [];
    // for(let i=0;i<this.verifierRoleList.length;i++){
    //   let loopVerifierRole = this.verifierRoleList[i].paramDesc;
    //   if(loopVerifierRole == verifierRole){
    //     tempVerifierRoleList.push(this.verifierRoleList[i]);
    //   }
    // }
    // this.editableSelectedVerifierRoleList = tempVerifierRoleList;

    // let tempApproverRoleList = [];
    // for(let i=0;i<this.approverRoleList.length;i++){
    //   let loopApproverRole = this.approverRoleList[i].paramDesc;
    //   if(loopApproverRole == approverRole){
    //     tempApproverRoleList.push(this.approverRoleList[i]);
    //   }
    // }
    // this.editableSelectedApproverRoleList = tempApproverRoleList;

    $("#editRoleModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  editRoleData(){
    let isConfirm = confirm("Are you sure want to change this?");
    if(isConfirm){
      let newEditableMenuId = CommonFunction.createCommaSeprate(this.editableSelectedMenuList);
      // let newEditableVerifierRole = CommonFunction.createCommaSeprateByParamDesc(this.editableSelectedVerifierRoleList);
      // let newEditableApproverRole = CommonFunction.createCommaSeprateByParamDesc(this.editableSelectedApproverRoleList);
      let jsonData = {
        "roleId" : this.editableRoleId,
        "menuId" : newEditableMenuId
        // verifierRole : newEditableVerifierRole,
        // approverRole :newEditableApproverRole

      }
      this.layoutComponent.ShowLoading = true;
      this.sharedService.updateDataByUpdateType(jsonData,'roleUpdate')
      .subscribe((response) =>{
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
          this.getAllRoleList();
        }
        else{
          this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        }
        this.layoutComponent.ShowLoading = false;
        
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("editRoleData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.layoutComponent.ShowLoading = false;
      });

      $("#editRoleModal").modal("hide");
    }
  }

  openAnyModal(modalId){
    $("#"+modalId).modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  closeAnyModal(modalName){
    $("#"+modalName).modal("hide");
  }
}
