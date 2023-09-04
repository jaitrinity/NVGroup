import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../layout/layout.component';
import { Constant } from '../shared/constant/Contant';
import { CommonFunction } from '../shared/service/CommonFunction';
import { SharedService } from '../shared/service/SharedService';
import { TrasanctionHdrTableSetting } from '../shared/tableSettings/TrasanctionHdrTableSetting';
declare var $: any;

@Component({
  selector: 'app-merge-checklist',
  templateUrl: './merge-checklist.component.html',
  styleUrls: ['./merge-checklist.component.scss','./merge-checklist.component.css']
})
export class MergeChecklistComponent implements OnInit {

  filterStartDate = "";
  filterEndDate = "";
  categoryName = "";
  subCategoryName = "";
  menuId = "";
  transactionHdrList = [];
  subcategoryList = [];
  selectedSubcategoryList = [];
  blankTableSettings :any = {};
  newSetting = TrasanctionHdrTableSetting.setting;
  transactionHdrSettings;
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  loginEmpId : any = "";
  loginEmpRole : any = "";
  loginEmpState : any = "";
  tenentId : any = "";
  button = "";
  color1 = "";
  color2 = "";
  columnKeyArr = [];
  columnTitleArr = [];
  constructor(private route: ActivatedRoute,private router : Router,
    private sharedService : SharedService, private layoutComponent : LayoutComponent,
    private toastr: ToastrService,
    public dialog: MatDialog) { 
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("empRoleId");
      this.loginEmpState = localStorage.getItem("state");
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
    }

  ngOnInit(): void {
    this.multiSelectdropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
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
      $("ng2-smart-table thead, .myTable thead").css('background-color',this.color1);
    }, 100);

    this.route.paramMap.subscribe(params => {
      this.newSetting.columns = Object.assign({}, this.blankTableSettings);
      this.subcategoryList = [];
      this.selectedSubcategoryList = [];
      this.filterStartDate = "";
      this.filterEndDate = "";
      this.transactionHdrList = [];
      this.menuId = params.get('menuId');
      this.categoryName = localStorage.getItem(this.menuId);
      this.layoutComponent.setPageTitle(this.categoryName);
      this.getDynamicColumn();
      this.getCategorySubcategoryByRole();
    });
  }

  onSelectOrDeselectSubcategory(item: any) {
    this.createCaptionList();
  }

  onSelectAllOrDeselectAllSubcategory(item: any) {
    this.selectedSubcategoryList = item;
  }

  createCaptionList(){
    let subCatName = CommonFunction.createCommaSeprateByParamDesc(this.selectedSubcategoryList);
    this.subCategoryName = subCatName;
  }

  getDynamicColumn(){
    let dynCol = [];
    this.columnKeyArr = [];
    this.columnTitleArr = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
      menuId : this.menuId
    }
    this.sharedService.getAllListBySelectType(jsonData,"dynamicColumn")
    .subscribe((response) =>{
      //console.log(response);
      dynCol = response.dynamicColumn;
      if(dynCol.length == 0){
        dynCol = [
          {columnKey : "transactionId",columnTitle:"Activity Id",columnWidth:"85px"},
          {columnKey : "fillingBy",columnTitle:"Employee Name",columnWidth:"85px"},
          {columnKey : "dateTime",columnTitle:"Date",columnWidth:"85px"},
        ];
      }
      
      for(let i=0;i<dynCol.length;i++){
        this.newSetting.columns[dynCol[i].columnKey] = {title:dynCol[i].columnTitle,width:dynCol[i].columnWidth};
        this.columnKeyArr.push(dynCol[i].columnKey);
        this.columnTitleArr.push(dynCol[i].columnTitle);
      }
      this.transactionHdrSettings = Object.assign({}, this.newSetting);
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getDynamicColumn"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  actionType : any = 0;
  getCategorySubcategoryByRole(){
    let jsonData = {
      tenentId : this.tenentId,
      menuId : this.menuId
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getCategorySubcategoryByRole(jsonData)
    .subscribe((response) =>{
      this.subcategoryList = response.wrappedList;
      this.layoutComponent.ShowLoading = false;
      this.getMenuTrasactions(this.actionType);
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  getMenuTrasactions(type : any){
    this.actionType = type;
    let subCatMenuIds = "";
    if(this.selectedSubcategoryList.length == 0){
      subCatMenuIds = CommonFunction.createCommaSeprate(this.subcategoryList);
    }
    else{
      subCatMenuIds = CommonFunction.createCommaSeprate(this.selectedSubcategoryList);
    }
    
    this.transactionHdrList = [];
    this.layoutComponent.ShowLoading = true;
    let json = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      loginEmpState : this.loginEmpState,
      tenentId : this.tenentId,
      menuId : this.menuId,
      subCatMenuId : subCatMenuIds,
      filterStartDate : this.filterStartDate,
      filterEndDate : this.filterEndDate,
      level : 2
    }
    this.sharedService.getMenuTrasactions(json)
    .subscribe((response) =>{
     
      this.transactionHdrList = response.wrappedList;
      if(this.transactionHdrList.length == 0){
        this.toastr.info("No record found","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
      this.layoutComponent.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getMenuTrasactions"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  transactionDetList = [];
  verifyDetList = [];
  approveDetList = [];
  viewVerifiedDate : any = "";
  viewVerifiedBy : any = "";
  viewApprovedDate : any = "";
  viewApprovedBy : any = "";
  transactionId : any = "";
  viewMenuId : any = "";
  viewDetails(event){
    this.transactionDetList = [];
    this.verifyDetList = [];
    this.approveDetList = [];
    this.transactionId = event.data.transactionId;
    this.viewMenuId = event.data.menuId;
    let verifierTId = event.data.verifierTId;
    let approvedTId = event.data.approvedTId;
    this.viewVerifiedDate = event.data.verifiedDate;
    this.viewVerifiedBy = event.data.verifiedBy;
    this.viewApprovedDate = event.data.approvedDate;
    this.viewApprovedBy = event.data.approvedBy;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      menuId : this.viewMenuId,
      transactionId : this.transactionId,
      verifierTId : verifierTId,
      approvedTId : approvedTId,
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getMenuTrasactionsDet(jsonData)
    .subscribe((response) =>{
      this.transactionDetList = response.wrappedList[0].transactionDetList; 
      this.verifyDetList = response.wrappedList[0].verifyDetList; 
      this.approveDetList = response.wrappedList[0].approveDetList;
      $("#viewDetailsModal").modal({
        backdrop : 'static',
        keyboard : false
      });
      setTimeout(() => {
        $("ng2-smart-table thead, .myTable thead").css('background-color',this.color1);
      }, 100);
      this.layoutComponent.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("transactionDetList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.layoutComponent.ShowLoading = false;
    });
  }

  exportData(){
    if(this.transactionHdrList.length != 0 ){
      let fileName = this.categoryName;
      if(this.subCategoryName !="") fileName = this.subCategoryName;
      CommonFunction.downloadFile(this.transactionHdrList,
        fileName+'_Report.csv', 
        this.columnKeyArr, 
        this.columnTitleArr)
    }
    else{
      alert("No data for export");
    }
  }

  openMedia(v){
    window.open(v);
  }

  generateDetPDF(){
    this.sharedService.readyAnyFile("test.css").subscribe(data => {
      var divContents = $("#content").html();
      var printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write('<html><head><title>'+this.categoryName+' - '+this.transactionId+'</title>');
      printWindow.document.write("<style>"+data.text()+"</style>");
      printWindow.document.write('</head><body>');
      printWindow.document.write(divContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    })
  }

  closeModal(){
      $("#viewDetailsModal").modal("hide");
  }

}
