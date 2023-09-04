import { Component, OnInit } from '@angular/core';
import { Constant } from '../shared/constant/Contant';
import { ChecklistTableSetting } from '../shared/tableSettings/ChecklistTableSetting';
import { SharedService } from '../shared/service/SharedService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunction } from '../shared/service/CommonFunction';
import { LayoutComponent } from '../layout/layout.component';
declare var $: any;

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  step : number = 1;
  alertFadeoutTime = 0;
  isNoGefence = false;
  isNew = true;
  qtd : any[] = [];
  isAnyChanges = false;
  inProgress = false;
  category = "";
  subcategory = "";
  caption = "";
  checkpointList = [];
  selectedCheckpointList = [];
  verifierList = [];
  selectedVerifierList = [];
  approverList = [];
  selectedApproverList = [];
  locationList = [];
  selectedLocationList = [];
  randomList = [];
  selectedRandomList = [];
  categoryIcon : any = "";
  subcategoryIcon : any = "";
  captionIcon : any = "";
  icons = "";
  distance = "";
  verifierRoleList = [];
  selectedVerifierRoleList = [];
  approverRoleList = [];
  selectedApproverRoleList = [];
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  button = "";
  color1 = "";
  color2 = "";
  maxNoOfPageList = [];
  selectedMaxNoOfPageList = [];
  resultChecklist = [];
  checklistTableSetting = ChecklistTableSetting.setting;
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  formatLabel(value: number) {
    // if (value >= 1000) {
    //   return Math.round(value / 1000) + 'k';
    // }
  
    return value;
  }
  constructor(private router: Router,private sharedService : SharedService,
    private toastr: ToastrService, private layoutComponent : LayoutComponent) { 
      this.loginEmpId = localStorage.getItem("empId");
      this.loginEmpRole = localStorage.getItem("loginEmpRole");
      this.alertFadeoutTime = Constant.ALERT_FADEOUT_TIME;
      this.tenentId = localStorage.getItem("tenentId");
      this.button = localStorage.getItem("button");
      this.color1 = localStorage.getItem("color1");
      this.color2 = localStorage.getItem("color2");
      this.layoutComponent.setPageTitle("Checklist");
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
      closeDropDownOnSelection: true
    };
    this.randomList = [{paramCode:'1',paramDesc:'Yes'},{paramCode:'0',paramDesc:'No'}]

    for(let i=1;i<=10;i++){
      let json = {
        paramCode : i, paramDesc : i+" "
      }
      this.maxNoOfPageList.push(json);
    }
    
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
      $(".checklist_forAll,.checklist_geoFence").attr("title","Click me to show ? details.");
      $(".checklist_forAll").click(function(){
        $("#checklistInfoAllModal").modal({
          backdrop : 'static',
          keyboard : false
        });
      });

      $(".checklist_geoFence").click(function(){
        $("#checklistInfoGeofenceModal").modal({
          backdrop : 'static',
          keyboard : false
        });
      })
    }, 100);
     
    this.getAllRoleList();
    this.getAllList();
    this.getAllChecklist();
    //this.updateRouterSequence();
  }

  setStep(index: number) {
    this.step = index;
  }

  locationIds = "";
  clickOnNoGeofence(){
    // alert(this.isNoGefence)
    if(!this.isNoGefence){
      this.locationIds = "0";
      this.selectedLocationList = [];
      this.distance = "";
    }
    else{
      this.locationIds = "";
    }
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

  noOfPage = [];
  onSelectNoOfPage(item){
    // console.log(item);
    this.verifierList = [];
    this.selectedVerifierList = [];
    this.approverList = [];
    this.selectedApproverList = [];
    this.noOfPage = [];
    for(let i=1;i<=item.paramCode;i++){
      this.noOfPage.push(i);
    }
  }
  onDeselectNoOfPage(item){
    this.verifierList = [];
    this.selectedVerifierList = [];
    this.approverList = [];
    this.selectedApproverList = [];
    this.noOfPage = [];
  }
  
  // 
  checkpointIdList = [];

  prepareVerifierList(){
    this.checkpointIdList = [];
    for(let i=0;i<this.noOfPage.length;i++){
      let checkpointBox = $("#checkpointBox"+this.noOfPage[i]).val().split(",");
        for(let i=0;i<checkpointBox.length;i++){
        this.checkpointIdList.push(checkpointBox[i]);
      }
    }

    this.selectedVerifierList = [];
    this.selectedApproverList = [];
    this.verifierList = [];
    this.approverList = [];
    for(let i=0;i<this.checkpointList.length;i++){
      let typeId = this.checkpointList[i].typeId;
      // console.log(typeId);
      let index = this.checkpointIdList.indexOf(this.checkpointList[i].paramCode);
      if (index == -1 && (typeId == 1 || typeId == 2 || typeId == 3 || typeId == 4 || typeId == 7 || typeId == 10)) {
        this.verifierList.push(this.checkpointList[i]);
        this.approverList.push(this.checkpointList[i]);
      }
    }
  }

  // onSelectCheckpoint(item){
  //   this.checkpointIdList.push(item.paramCode);
  //   this.prepareVerifierList();
  // }
  // onDeselectCheckpoint(item){
  //   let index = this.checkpointIdList.indexOf(item.paramCode);
  //   if (index !== -1) {
  //     this.checkpointIdList.splice(index, 1);
  //   }
  //   this.prepareVerifierList();
  // }
  // onSelectAllCheckpoint(item){
  //   this.selectedVerifierList = [];
  //   this.selectedApproverList = [];
  //   this.verifierList = [];
  // }
  // onDeselectAllCheckpoint(item){
  //   this.selectedVerifierList = [];
  //   this.selectedApproverList = [];
  //   this.verifierList = item;
  // }

  onSelectCheckpoint(item, opNo){
    let currectValue = $("#checkpointBox"+opNo).val();
    $("#checkpointBox"+opNo).val("");
    let logicArr = currectValue.split(",");
    if(currectValue == "") logicArr = [];
    logicArr.push(item.paramCode);
    // console.log(logicArr)
    let checkpointBox = CommonFunction.prepareCommaSeprateValue(logicArr);
    $("#checkpointBox"+opNo).val(checkpointBox);

    this.prepareVerifierList();
  }
  onDeselectCheckpoint(item, opNo){
    let currectValue = $("#checkpointBox"+opNo).val();
    $("#checkpointBox"+opNo).val("");
    let logicArr = currectValue.split(",");

    let index = logicArr.indexOf(item.paramCode);
    if (index !== -1) {
      logicArr.splice(index, 1);
    }
    $("#checkpointBox"+opNo).val("");
    let checkpointBox = CommonFunction.prepareCommaSeprateValue(logicArr);
    $("#checkpointBox"+opNo).val(checkpointBox);

    this.prepareVerifierList();
  }
  onSelectAllCheckpoint(item, opNo){
    let logicArr = [];
    for(let i=0;i<item.length;i++){
      logicArr.push(item[i].paramCode);
    }
    $("#checkpointBox"+opNo).val("");
    let checkpointBox = CommonFunction.prepareCommaSeprateValue(logicArr);
    $("#checkpointBox"+opNo).val(checkpointBox);

    this.prepareVerifierList();
  }
  onDeselectAllCheckpoint(item, opNo){
    let logicArr = [];
    let checkpointBox = CommonFunction.prepareCommaSeprateValue(logicArr);
    $("#checkpointBox"+opNo).val(checkpointBox);

    this.prepareVerifierList();
  }

  // verifierCheckpointIdList = [];

  // prepareApproverList(){
  //   this.selectedApproverList = [];
  //   this.approverList = [];
  //   for(let i=0;i<this.verifierList.length;i++){
  //     let index = this.verifierCheckpointIdList.indexOf(this.verifierList[i].paramCode);
  //     if (index == -1) {
  //       this.approverList.push(this.verifierList[i]);
  //     }
  //   }
  // }

  onSelectVerifier(item){
    // this.verifierCheckpointIdList.push(item.paramCode);
    // this.prepareApproverList();
  }
  onDeselectVerifier(item){
    // let index = this.verifierCheckpointIdList.indexOf(item.paramCode);
    // if (index !== -1) {
    //   this.verifierCheckpointIdList.splice(index, 1);
    // }
    // this.prepareVerifierList();
  }
  onSelectAllVerifier(item){
    // this.selectedApproverList = [];
    // this.approverList = [];
  }
  onDeselectAllVerifier(item){
    // this.selectedApproverList = [];
    // this.approverList = item;
  }

  onSelectOrDeselectLocation(item){
    this.locationIds = CommonFunction.createCommaSeprate(this.selectedLocationList);
    // console.log(this.locationIds)
  }
  onSelectAllOrDeselectAllLocation(item){
    this.selectedLocationList = item;
    this.locationIds = CommonFunction.createCommaSeprate(this.selectedLocationList);
    // console.log(this.locationIds)
  }

  closeModal(modalName){
    $("#"+modalName).modal("hide");
  }

  getAllList(){
    this.sharedService.getAllList('checklist', this.tenentId)
    .subscribe((response) =>{
      // console.log(response);
      this.checkpointList = response.checkpointList;
      // this.verifierList = response.checkpointList;
      // this.approverList = response.checkpointList;
      this.locationList = response.locationList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllList"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  getAllRoleList(){
    this.sharedService.getAllList('role', this.tenentId)
    .subscribe((response) =>{
      // console.log(response);
      this.verifierRoleList = response.roleList;
      this.approverRoleList = response.roleList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllRoleList"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  getAllChecklist(){
    this.resultChecklist = [];
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
      
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getAllListBySelectType(jsonData,"checklist")
    .subscribe((response) =>{
      this.resultChecklist = response.checklist;
      this.layoutComponent.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllChecklist"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  changeListener($event, i): void {
    this.readThis($event.target, i);
  }

  readThis(inputValue: any, optionNumber): void {
    var file: File = inputValue.files[0];
    // console.log(file);
    let wrongFile = false;
    let fileName = file.name;
    let fileSize = file.size; // 
    if(!(fileName.indexOf(".jpg") > -1 || fileName.indexOf(".jpeg") > -1 || fileName.indexOf(".png") > -1)
    || fileSize/1024 > 100){
      // alert("only .jpg,.jpeg,.png,.pdf format accepted");
      this.toastr.warning("only .jpg, .jpeg, .png format accepted and image size should be less than from 100 KB, please choose right file.","Alert !");
      wrongFile = true;
    }
    var myReader: FileReader = new FileReader();
    // console.log(myReader);
    myReader.onloadend = (e) => {
      let image = myReader.result;
      if (optionNumber == 1) {
        this.categoryIcon = image;
        if(wrongFile){
          $("#categoryIcon").val("");
          this.categoryIcon = "";
        }
      }
      else if (optionNumber == 2) {
        this.subcategoryIcon = image;
        if(wrongFile){
          $("#subcategoryIcon").val("");
          this.subcategoryIcon = "";
        }
      }
      else if (optionNumber == 3) {
        this.captionIcon = image;
        if(wrongFile){
          $("#captionIcon").val("");
          this.captionIcon = "";
        }
      }
    }
    myReader.readAsDataURL(file);
  }

  validateCheckpoint() : any{
    if(this.noOfPage.length == 0){
      this.toastr.warning("please select no of pages ","Alert !",{timeOut : this.alertFadeoutTime});
      return false;
    }
    for(let i=0;i<this.noOfPage.length;i++){
      let checkpointBox = $("#checkpointBox"+this.noOfPage[i]).val();
      if(checkpointBox == ""){
        this.toastr.warning("please select atleast one page "+this.noOfPage[i]+" checkpoint ","Alert !",{timeOut : this.alertFadeoutTime});
        return false;
      }
    }
    return true;
  }

  submitChecklistData(type:any){
    if(this.category == ""){
      this.toastr.warning("please enter category value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(type == 'new' && this.categoryIcon == ""){
      this.toastr.warning("please browser categoryIcon","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    // else if(this.subcategory == ""){
    //   this.toastr.warning("please enter subcategory value ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    else if(type == 'new' && this.subcategory != "" && this.subcategoryIcon == ""){
      this.toastr.warning("please browser subcategoryIcon","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    // else if(this.caption == ""){
    //   this.toastr.warning("please enter caption value ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    else if(type == 'new' && this.caption != "" && this.captionIcon == ""){
        this.toastr.warning("please browser captionIcon ","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
    }
    // else if(this.icons == ""){
    //   this.toastr.warning("please enter icon value ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    else if(type == 'new' && !this.validateCheckpoint()){
      return ;
    }
    // else if(this.selectedCheckpointList.length == 0){
    //   this.toastr.warning("please select atleast one checkpoint ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    // else if(this.selectedVerifierList.length == 0){
    //   this.toastr.warning("please select atleast one verifier  ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    // else if(this.selectedApproverList.length == 0){
    //   this.toastr.warning("please select atleast one approver ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    else if(type == 'new' && (this.selectedLocationList.length == 0 && this.locationIds == "")){
      this.toastr.warning("please select atleast one location or check `No Geofence` ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    // else if(type == 'new' && this.selectedLocationList.length != 0 && this.distance == ""){
    //   this.toastr.warning("please enter distance ","Alert !",{timeOut : this.alertFadeoutTime});
    //   return ;
    // }
    else if(type == 'new' && (this.locationIds != "" && this.locationIds != "0") && this.distance == ""){
      this.toastr.warning("please enter distance ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
  //   else if(type == 'new' && this.selectedRandomList.length == 0 ){
  //     this.toastr.warning("please select random ","Alert !",{timeOut : this.alertFadeoutTime});
  //     return ;
  // }
    // let checkpointIds = CommonFunction.createCommaSeprate(this.selectedCheckpointList);
    let checkpointBox = "";
    $(".checkpointBox").each(function(){
        checkpointBox += $(this).val()+":";
    });
    let checkpointIds = checkpointBox.substring(0,checkpointBox.length-1);
    let verifierIds = CommonFunction.createCommaSeprate(this.selectedVerifierList);
    let approverIds = CommonFunction.createCommaSeprate(this.selectedApproverList);
    // let ramdomId = CommonFunction.createCommaSeprate(this.selectedRandomList);
    let ramdomId = 0 ; // Bydefault `No` Random
    let verifierRole = "";
    let approvalRole = "";
    verifierRole = this.selectedVerifierRoleList.length == 0 ? "" : CommonFunction.createCommaSeprateByParamDesc(this.selectedVerifierRoleList);
    approvalRole = this.selectedApproverRoleList.length == 0 ? "" : CommonFunction.createCommaSeprateByParamDesc(this.selectedApproverRoleList);

    let geoFence = "";
    if(this.locationIds == "" || this.locationIds == "0")
      geoFence = "0";
    else
      geoFence = this.locationIds+":"+this.distance;

    let jsonData = {
      editMenuId : this.editMenuId,
      category : this.category,
      subcategory : this.subcategory,
      caption : this.caption,
      checkpointId : checkpointIds,
      verifierId : verifierIds,
      approverId : approverIds,
      geoFence : geoFence,
      categoryIcon : this.categoryIcon,
      subcategoryIcon : this.subcategoryIcon,
      captionIcon : this.captionIcon,
      icons : this.icons,
      active : ramdomId,
      tenentId : this.tenentId,
      verifierRole : verifierRole,
      approvalRole : approvalRole,
      type:type,
    }
    // console.log(JSON.stringify(jsonData));
    // this.spinner.show();
    this.inProgress = true;
    this.sharedService.insertDataByInsertType(jsonData,"checklist")
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.setDefaultField();
        this.getAllChecklist();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      // this.spinner.hide();
      this.inProgress = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitChecklistData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  validateData(type){
    // alert("dd")
    if(type == 1 && this.category == ""){
      $("#categoryIcon").val("");
      this.categoryIcon = "";

      this.subcategory = "";
      $("#subcategoryIcon").val("");
      this.subcategoryIcon = "";

      this.caption = "";
      $("#captionIcon").val("");
      this.captionIcon = "";
    }
    else if(type == 2 && this.subcategory == ""){
      $("#subcategoryIcon").val("");
      this.subcategoryIcon = "";

      this.caption = "";
      $("#captionIcon").val("");
      this.captionIcon = "";
    }
    else if(type == 3 && this.caption == ""){
      $("#captionIcon").val("");
      this.captionIcon = "";
    }
  }

  setDefaultField(){
    this.isNew = true;
    this.category = "";
    this.subcategory = "";
    this.caption = "";
    this.selectedCheckpointList = [];
    this.selectedVerifierList = [];
    this.selectedApproverList = [];
    this.selectedLocationList = [];
    this.selectedMaxNoOfPageList = [];
    this.selectedRandomList = [];
    this.selectedVerifierRoleList = [];
    this.selectedApproverRoleList = [];
    this.noOfPage = [];
    this.qtd = []; 
    $(".checkpointBox").val();
    $("#categoryIcon").val("");
    $("#subcategoryIcon").val("");
    $("#captionIcon").val("");
    this.icons = "";
    this.locationIds = "";
    this.distance = "";
    this.isNoGefence = false;
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'previewRecord':
        this.previewChecklist(event);
        break;
    //  case 'deactiverecord':
    //     this.actionOnEmployee(event,0);
    //     break;
      case 'editRecord':
        this.editChecklist(event);
        break;
    }
  }

  editMenuId = "";
  editChecklist(event){
    this.selectedVerifierRoleList = [];
    this.selectedApproverRoleList = [];
    this.editMenuId = event.data.menuId;
    this.category = event.data.category;
    this.subcategory = event.data.subcategory;
    this.caption = event.data.caption;
    this.icons = event.data.catIcons;
    if(event.data.subcatIcons == null && event.data.subcatIcons != ""){
      this.icons += ","+event.data.subcatIcons;
    }
    if(event.data.capIcons == null && event.data.capIcons != ""){
      this.icons += ","+event.data.capIcons;
    }
    let checkpointId = event.data.checkpoint.split(":");
    let verifier = event.data.verifier.split(",");
    let approver = event.data.approver.split(",");
    let item = {paramCode:checkpointId.length, paramDesc:checkpointId.length+" "};
    this.selectedMaxNoOfPageList = [item];
    this.onSelectNoOfPage(item);
    

    let nop = 0;
    for(let i=0;i<checkpointId.length;i++){
      nop++;
      let checkpoint = checkpointId[i].split(",");
      let pageCheckpoint = [];
      for(let j=0;j<checkpoint.length;j++){
        let data = {paramCode:checkpoint[j],paramDesc:checkpoint[j]+" "};
        pageCheckpoint.push(data);
        // this.onSelectCheckpoint(data,nop);
      }
      this.qtd[nop] = pageCheckpoint;
    }

    setTimeout(() => {
      nop = 0;
      for(let i=0;i<checkpointId.length;i++){
        nop++;
        $("#checkpointBox"+nop).val(checkpointId[i]);
      }
      this.prepareVerifierList();

      let tempSelectedVerifierList = []
      for(let i=0;i<verifier.length;i++){
        if(verifier[i] !=""){
          let data = {paramCode:verifier[i],paramDesc:verifier[i]+" "};
          tempSelectedVerifierList.push(data);
        }
        
      }
      this.selectedVerifierList = tempSelectedVerifierList;

      let tempSelectedApproverList = []
      for(let i=0;i<approver.length;i++){
        if(approver[i] !=""){
          let data = {paramCode:approver[i],paramDesc:approver[i]+" "};
          tempSelectedApproverList.push(data);
        }
        
      }
      this.selectedApproverList = tempSelectedApproverList;
    }, 200);
    
    

    let geoFence = event.data.geoFence.split(":");
    if(geoFence.length == 2){
      let location = geoFence[0].split(",");
      let tempSelectedLocationList = [];
      for(let i=0;i<location.length;i++){
        let json = {
          paramCode : location[i],
          paramDesc : location[i]+" ",
        }
        tempSelectedLocationList.push(json);
      }
      this.selectedLocationList = tempSelectedLocationList;
      this.distance = geoFence[1];
    }
    else{
      this.isNoGefence = true;
      this.locationIds = "0";
    }

    let isRandom = event.data.active;
    let randomValue = isRandom == 0 ? "No" : "Yes"
    this.selectedRandomList= [{paramCode:isRandom, paramDesc:randomValue}];

    let verifierRole = event.data.verifierRole;
    let approverRole = event.data.approverRole;
    let tempVerifierRoleList = [];
    for(let i=0;i<this.verifierRoleList.length;i++){
      let loopVerifierRole = this.verifierRoleList[i].paramDesc;
      if(loopVerifierRole == verifierRole){
        tempVerifierRoleList.push(this.verifierRoleList[i]);
      }
    }
    this.selectedVerifierRoleList = tempVerifierRoleList;

    let tempApproverRoleList = [];
    for(let i=0;i<this.approverRoleList.length;i++){
      let loopApproverRole = this.approverRoleList[i].paramDesc;
      if(loopApproverRole == approverRole){
        tempApproverRoleList.push(this.approverRoleList[i]);
      }
    }
    this.selectedApproverRoleList = tempApproverRoleList;

    // this.step = 0;
    this.openAnyModal('createChecklistModal');
    this.isNew = false;
  }

  previewMenuId = "";
  previewCheckpointDetails = [];
  sequenceCheckpointArr = [];
  allCheckpoints  = [];
  previewChecklist(event){
    this.isAnyChanges = false;
    this.previewMenuId = "";
    this.previewCheckpointDetails = [];
    this.sequenceCheckpointArr = [];
    this.allCheckpoints = [];
    $("#previewChecklistModal").modal({
      backdrop : 'static',
      keyboard : false
    });
    this.previewMenuId = event.data.menuId;
    let previewCheckpointId = event.data.checkpoint;
    this.sequenceCheckpointArr = previewCheckpointId.split(":");
    for(let i=0;i<this.sequenceCheckpointArr.length;i++){
      let checkpoints = this.sequenceCheckpointArr[i].split(",");
      for(let j=0;j<checkpoints.length;j++){
        this.allCheckpoints.push(checkpoints[j]);
      }
    }
    
    let jsonData = {
      previewCheckpointId : previewCheckpointId,
    }
    this.layoutComponent.ShowLoading = true;
    this.sharedService.getAllListBySelectType(jsonData,'previewCheckpointDetails')
    .subscribe((response) =>{
      // console.log(response)
      this.previewCheckpointDetails = response.previewCheckpointDetails;
      this.layoutComponent.ShowLoading = false;
      setTimeout(() => {
        this.slidePreIndex = 1;
       this.showPreDivs(this.slidePreIndex);
      }, 200);
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("previewCheckpointDetails"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
    
  }

  slidePreIndex = 1;
  plusPreDivs(n) {
    this.showPreDivs(this.slidePreIndex += n);
  }

  showPreDivs(n) {
    var i;
    var x = document.getElementsByClassName("previewPage");
    if (n > x.length) {this.slidePreIndex = 1}    
    if (n < 1) {this.slidePreIndex = x.length}
    for (i = 0; i < x.length; i++) {
       (<HTMLInputElement>x[i]).style.display = "none";
    }
    (<HTMLInputElement>x[this.slidePreIndex-1]).style.display = "block";  
  }

  showDependent(event, cpId, logicCp){
    $(".dependentQues_"+cpId).hide();
    let depCp = logicCp.split(":");
    let selectedIndex = event.target.selectedIndex;
    let depLogic = depCp[selectedIndex-1].split(",");
    for(let i=0;i<depLogic.length;i++){
      $("#dep_"+cpId+"_"+depLogic[i]).show();
    }
    // alert(depCp[selectedIndex-1]);
    // $("#dep_"+event.target.value);
    
    // console.log(event.target.value);
    // alert(event.target.value);
    // let cp
  }

  saveChanges(){
    // let isWrong = false;
    let checkpoints = "";
    for(let i=0;i<this.sequenceCheckpointArr.length;i++){
      let newCp =  $("#sequenceTxt_"+i).val();
      checkpoints += newCp;
      if(i < this.sequenceCheckpointArr.length-1){
        checkpoints += ":";
      }
      
      // console.log("newCp :: "+newCp);
      if(newCp == ""){
        // isWrong = true;
        this.toastr.warning("All fields are fill","Alert !",{timeOut : this.alertFadeoutTime});
        return ;
      }
      else{
        let newCpSplit = newCp.split(",");
        for(let i=0;i<newCpSplit.length;i++){
          let newCpId = newCpSplit[i];
          let index = this.allCheckpoints.indexOf(newCpId);
          if (index == -1) {
            // isWrong = true;
            this.toastr.warning(newCpId+" should be available","Alert !",{timeOut : this.alertFadeoutTime});
            return ;
          }
        }
      }
    }

    let jsonData = {
      menuId : this.previewMenuId,
      checkpointId : checkpoints
    }
    // console.log(jsonData)
    this.layoutComponent.ShowLoading = true;
    this.sharedService.updateDataByUpdateType(jsonData,'changeChecklistChecpointSequence')
    .subscribe((response) =>{
      // console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.closeModal('previewChecklistModal');
        this.getAllChecklist();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.layoutComponent.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("changeChecklistChecpointSequence"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });

  }

  cancelEdit(){
    this.isNew = true;
    this.setDefaultField();
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
