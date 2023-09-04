import { Component, OnInit } from '@angular/core';
import { Constant } from '../shared/constant/Contant';
import { CheckpointTableSetting } from '../shared/tableSettings/CheckpointTableSetting';
import { Router } from '@angular/router';
import { SharedService } from '../shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { CommonFunction } from '../shared/service/CommonFunction';
import { LayoutComponent } from '../layout/layout.component';
declare var $: any;

@Component({
  selector: 'app-checkpoint',
  templateUrl: './checkpoint.component.html',
  styleUrls: ['./checkpoint.component.css']
})
export class CheckpointComponent implements OnInit {
  videoBrowserHTML = "Brows Video";
imageBrowserHTML = "Brows Image";
videoBase64 : any = "";
imageBase64 : any = "";
valueInNumber = "";
correctInNumber = "";
sizeInNumber = "";
queryColumn = "";
sqlQueryError = "";
queryInfo = "";
columnValueArr = [];
errorInQuery = false;
inProgress = false;
isAllOk = true;
isInputTypeIsNumber = false;
isShowQueryTxt = false;
isShowScoreTxt = false;
scorePlaceholder = "";
isShowSizeTxt = true;
isShowSizeSelect = false;
isShowCorrectTxt = true;
isShowCorrectSelect = false;
noOfOptionRow = false;
isShowValueTxt = true;
isShowValueSelect = false;
isShowDependentTxt = false;
isShowDependentSelect = false;
isShowLogicTxt = false;
isShowCheckbox = false;
isShowRadio = false;
isShowActive = false;
isSizeSelectDisabled = false;
isShowVideoBrowser = false;
isShowImageBrowser = false;
valueHTML = "Value";
correctHTML = "Correct";
sizeHTML = "Size";
activeHTML = "Random";
valuePlaceholder="";
sizePlaceholder = "";
correctPlaceholder = "";
logicPlaceholder = "";
alertFadeoutTime = 0;
description = "";
optionValue = "";
inputTypeList = [];
selectedInputTypeList = [];
noOfOption = [];
maxNoOfOption = [];
selectedMaxNoOfOption = [];

languageList = [];
selectedLanguageList = [];
activeList = [];
selectedActiveList = [];
dependentList = [];
selectedDepetendentList = [];
mandatoryList = [];
selectedMandatoryList = [];
editableList = [];
selectedEditableList = [];
correctList = [];
selectedCorrectList = [];
sizeList = [];
selectedSizeList = [];
valueList = [];
selectedValueList = [];
correct = "";
size = "";
prefixSize = "";
suffixSize = "";
score = "";
logic = "";
dependent = "0";
isSql = 0;
checkpointList = [];
logicCheckpointList = [];
selectedLogicCheckpointList = [];
checkpointTableSettings = CheckpointTableSetting.setting;
loginEmpId = "";
loginEmpRole = "";
tenentId = "";
button = "";
color1 = "";
color2 = "";
createCheckpointCount = 0;
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
    this.layoutComponent.setPageTitle("Checkpoint");
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
  
  
  this.mandatoryList = [{"paramCode":"1","paramDesc":"Mandatory"},
                        {"paramCode":"0","paramDesc":"Non Mandatory"}
                    ];
  

  this.editableList = [{"paramCode":"1","paramDesc":"Editable"},
                        {"paramCode":"0","paramDesc":"Non Editable"}
                    ]
  
  let tempMaxNoOfOption = [];
  for(let i=2;i<=10;i++){
    let json = {"paramCode":i,"paramDesc":i+" "}
              
    tempMaxNoOfOption.push(json);
  }
  this.maxNoOfOption = tempMaxNoOfOption;
  
  setTimeout(() => {
    $("ng2-smart-table thead").css('background-color',this.color1);
    $(".checkpoint_size,.checkpoint_logic").attr("title","Click me to show ? details.");

    $(".checkpoint_size").click(function(){
      $("#checkpointSizeInfoModal").modal({
        backdrop : 'static',
        keyboard : false
      });
    });

    $(".checkpoint_logic").click(function(){
      $("#checkpointLogicInfoModal").modal({
        backdrop : 'static',
        keyboard : false
      });
    });
  }, 100);
  
  this.getAllList();
  this.getAllCheckpointList();
  this.getAllCheckpointListArr();
  //this.updateRouterSequence();
}
closeModal(modalName){
  $("#"+modalName).modal("hide");
  if(modalName == "createCheckpointModal" && this.createCheckpointCount != 0){
    this.createCheckpointCount = 0;
    this.getAllCheckpointList();
  }
}
changeSelected(e){
  $("#createCheckpointModal").modal({
    backdrop : 'static',
    keyboard : false
  });
}

onSelectOrDeselectValue(item){
  this.sizeList = [];
  this.selectedSizeList = [];
  let inputType = this.selectedInputTypeList[0].paramCode;
  if(inputType == 5){
    let tempSizeList = [];
    for(let i=1;i<=item.paramCode;i++){
      let json = {"paramCode":i,"paramDesc":i+" "}
      tempSizeList.push(json);
    } 
    this.sizeList = tempSizeList;
  }
  else if(inputType == 7){
    this.sizeList = [{"paramCode":"0","paramDesc":"Time"},
                        {"paramCode":"1","paramDesc":"Date"},
                        {"paramCode":"2","paramDesc":"Datetime"},
                    ];
  }
}

onSelectOrDeselectDependent(item){
  this.isShowLogicTxt = false;
  if(item.paramCode == 1){
    this.isShowLogicTxt = true;
  }
}
onSelectOrDeselectNoOfOption(item){
  this.noOfOption = [];
  let noOfOption = item.paramCode;
  for(let i=1;i<=noOfOption;i++){
    this.noOfOption.push(i)
  }
}
makeAsDefaultAllFields(){
  this.description = "";
  this.valueInNumber = "";
  this.sizeInNumber = "";
  this.correctInNumber = "";
  this.valueHTML = "Value";
  this.correctHTML = "Correct";
  this.sizeHTML = "Size";
  this.activeHTML = "Random";
  this.isSizeSelectDisabled = false;
  this.errorInQuery = false;
  this.queryInfo = "";
  this.sqlQueryError = "";
  this.queryColumn = "";
  this.isAllOk = true;
  this.isShowValueTxt = false;
  this.isShowValueSelect = false;
  this.valuePlaceholder = "";
  this.isShowLogicTxt = false;
  this.isShowScoreTxt = false;
  this.isShowQueryTxt = false;
  this.isSql = 0;
  
  this.noOfOptionRow = false;
  this.isShowCorrectTxt = false;
  this.isShowCorrectSelect = false;
  this.isShowActive = false;
  this.isShowVideoBrowser = false;
  this.isShowImageBrowser = false;
  
  // this.optionValueForSelection = "";
  // this.correctValueForSelection = "";
  this.size = "";
  this.correct = "";
  this.optionValue = "";
  this.score = "";
  this.logic = "";
  this.isShowSizeTxt = false;
  this.isInputTypeIsNumber = false;
  this.isShowSizeSelect = false;
  this.sizePlaceholder = "";
  this.logicPlaceholder = "";
  //this.selectedDepetendentList = [];
  this.selectedActiveList = [];
  this.selectedValueList = [];
  this.selectedSizeList = [];
  this.selectedMandatoryList = [];
  this.selectedEditableList = [];
  this.selectedLanguageList = [];
  this.selectedMaxNoOfOption = [];
  this.selectedLogicCheckpointList = [];
  this.noOfOption = [];
  this.isShowDependentSelect = false;
  this.isShowCheckbox = false;
  this.isShowRadio = false;
  $("#videoBase64").val("");
  this.videoBase64 = "";
  $("#imageBase64").val("");
  this.imageBase64 = "";
}
onSelectOrDeselectInputType(item){
  // console.log(item)
  this.makeAsDefaultAllFields();
  if(this.selectedInputTypeList.length ==0){
    return;
  }
  this.selectedMandatoryList = [{"paramCode":"1","paramDesc":"Mandatory"}];
  this.selectedEditableList = [{"paramCode":"1","paramDesc":"Editable"}];
  this.selectedLanguageList = [{"paramCode": "1","paramDesc": "English"}];
  this.isAllOk = false;
  if(item.paramCode == 1){
    this.correctHTML = "Allow Character";
    this.correctPlaceholder = "Enter can not use charactor";
    this.correct = "[a-zA-Z0-9 ]+";
    this.isShowCorrectTxt = true;

    this.sizeHTML = "Character Limit";
    this.sizeInNumber = "true";
    this.sizePlaceholder = "Maximum no of charactor entered";
    this.isShowSizeTxt = true;

    //this.isShowActive = true;
  }
  else if(item.paramCode == 2){
    this.correctHTML = "Allow Character";
    this.correctPlaceholder = "Enter can not use charactor";
    this.correct = "[a-zA-Z0-9 ]+"; // Only accept a to z character
    this.isShowCorrectTxt = true;

    this.sizeHTML = "Character Limit";
    this.sizeInNumber = "true";
    this.sizePlaceholder = "Maximum no of charactor entered";
    this.isShowSizeTxt = true;

    //this.isShowActive = true;
  }
  else if(item.paramCode == 3.0){
    this.sizeHTML = "Input Size";
    this.isInputTypeIsNumber = true;
    this.sizeInNumber = "true";
    // this.isShowSizeTxt = true;
    this.sizePlaceholder = "two value with comma separated"+
    "Ex. 6,2"+ 
    "nine digit can. be entered with 6 digit followed by decimal & 2 digit after decimal";

    //this.isShowActive = true;
  }
  else if(item.paramCode == 3.1){
    this.valueHTML = "URL for sending OTP";
    this.isShowValueTxt = true;
    this.valuePlaceholder = "URL for sending OTP ";

    //this.isShowActive = true;
  }
  // checkbox
  else if(item.paramCode == 4.0){

    // this.isShowValueTxt = true;
    // this.valuePlaceholder="comma separate value, Auto fill click on save value";
    
    this.noOfOptionRow = true;
    this.isShowCheckbox = true;
    
    // this.isShowCorrectTxt = true;
    // this.correct = "";
    // this.correctPlaceholder = "Auto fill, click on checkbox";

    // this.isShowSizeSelect = true;
    // this.isShowDependentSelect = true;

    // this.isShowScoreTxt = true;
    // this.scorePlaceholder = "% of score for selection of each option separated";

    // this.isShowLogicTxt = true;
    // this.logicPlaceholder = "logic for dependent question all dependent checkpoint";

    this.isShowActive = true;
  }
  // radio
  else if(item.paramCode == 4.1){
    // this.isShowValueTxt = true;
    // this.valuePlaceholder="comma separate value, Auto fill click on save value";
    
    this.noOfOptionRow = true;
    this.isShowRadio = true;
    // this.isShowCorrectTxt = true;
    // this.correct = "";
    // this.correctPlaceholder = "Auto fill, click on checkbox";

    // this.isShowSizeSelect = true;
    // this.isShowDependentSelect = true;

    // this.isShowScoreTxt = true;
    // this.scorePlaceholder = "% of score for selection of each option separated";

    // this.isShowLogicTxt = true;
    // this.logicPlaceholder = "logic for dependent question all dependent checkpoint";

    this.isShowActive = true;
  }
  else if(item.paramCode == 5){
    // this.valueInNumber = "true";
    this.valueHTML = "Total Images";
    this.isShowValueSelect = true;
    // this.valuePlaceholder = "No of mandatory images";
    
    this.sizeHTML = "Mandatory Images";
    this.isShowSizeSelect = true;

    this.isShowActive = true;
    this.activeHTML = "Geo Tag";
  }
  else if(item.paramCode == 6){
    
  }
  else if(item.paramCode == 7){
    this.valueHTML = "Date Restriction";
    this.isShowValueSelect = true;
    this.sizeHTML = "Datetime Format";
    this.isShowSizeSelect = true;
  }
  else if(item.paramCode == 8){
    this.correctInNumber = "true";
    this.correctHTML = "Min % for Dep. Ques.";
    this.isShowCorrectTxt = true;
    this.correctPlaceholder = "Mention % for triggering dependent question";

    this.isShowLogicTxt = true;
    this.logicPlaceholder = "logic for dependent question all dependent checkpoint";

    this.sizeHTML = "Interval";
    this.isShowSizeSelect = true;
    this.isShowActive = true;
    this.activeHTML = "Active";
    
  }
  else if(item.paramCode == 9){
    this.correctInNumber = "true";
    this.correctHTML = "Min % for Dep. Ques.";
    this.isShowCorrectTxt = true;
    this.correctPlaceholder = "Mention % for triggering dependent question";

    this.isShowLogicTxt = true;
    this.logicPlaceholder = "logic for dependent question all dependent checkpoint";

    this.sizeHTML = "Interval";
    this.isShowSizeSelect = true;
    this.isShowActive = true;
    this.activeHTML = "Type";
  }
  else if(item.paramCode == 10){
    // this.isShowValueTxt = true;
    // this.valuePlaceholder="comma separate value, Auto fill click on save value";
    
    this.noOfOptionRow = true;
    this.isShowRadio = true;
    
    // this.isShowCorrectTxt = true;
    // this.correct = "";
    // this.correctPlaceholder = "Auto fill, click on checkbox";

    // this.isShowSizeSelect = true;
    // this.isShowDependentSelect = true;
    // this.isShowLogicTxt = true;
    // this.logicPlaceholder = "logic for dependent question all dependent checkpoint";

    // this.isShowScoreTxt = true;
    // this.scorePlaceholder = "% of score for selection of each option separated";
    this.isShowActive = true;
  }
  else if(item.paramCode == 11){
    this.valueHTML = "Validation URL";
    this.isShowValueTxt = true;
    this.valuePlaceholder = "URL for API";
  }
  else if(item.paramCode == 12){
    this.valueHTML = "URL for sending video";
    this.isShowValueTxt = true;
    this.valuePlaceholder = "URL for sending video";

    this.sizeInNumber = "true";
    this.sizeHTML = "Video size (in MB)";
    this.isShowSizeTxt = true;
    this.sizePlaceholder = "Video size (in MB)";
  }
  else if(item.paramCode == 13){
    this.valueHTML = "Address Format";
    this.isShowValueSelect = true;
  }
  else if(item.paramCode == 14){}
  else if(item.paramCode == 15){
    this.sizeHTML = "Type";
    this.isShowSizeSelect = true;
  }
  else if(item.paramCode == 16){
    this.valueHTML = "Enter URL";
    this.valuePlaceholder = "Enter URL";
    this.isShowValueTxt = true;

    this.correctHTML = "Display On";
    this.isShowCorrectSelect = true;
  }
  else if(item.paramCode == 17){
    this.sizeHTML = "Alignment";
    this.isShowSizeSelect = true;
  }
  else if(item.paramCode == 18){
    // this.valueHTML = "Video URL";
    // this.isShowValueTxt = true;
    // this.valuePlaceholder = "URL for video";
    this.isShowVideoBrowser = true;
    this.isShowActive = true;
    this.activeHTML = "Type";
  }
  else if(item.paramCode == 19){
    this.isShowImageBrowser = true;

    // this.valueHTML = "Image URL";
    // this.isShowValueTxt = true;
    // this.valuePlaceholder = "URL for image display";

    // this.sizeHTML = "Image Limit";
    // this.sizeInNumber = "true";
    // this.isShowSizeTxt = true;
    // this.sizePlaceholder = "KB limit in size";
  }
  else if(item.paramCode == 20){}
  else if(item.paramCode == 21){
    this.errorInQuery = true;
    this.queryInfo = "Only `select` query with single column is valid..";
    this.isShowQueryTxt = true;
    this.valueHTML = "Query";
    this.isSql = 1;
  }
  else if(item.paramCode == 22){}

  // ----------dependent list-----------------
  if(item.paramCode == 4 || item.paramCode == 4.1 || item.paramCode == 10){
    this.dependentList = [{"paramCode":"0","paramDesc":"No dependent"},
                            {"paramCode":"1","paramDesc":"Depending"},
                            {"paramCode":"2","paramDesc":"Piping"}
                        ]
  }

  // ---------Active list------------------
  if(item.paramCode == 1 || item.paramCode == 2 || item.paramCode == 3.0 || item.paramCode == 3.1 || item.paramCode == 4.0 || item.paramCode == 4.1 ||
    item.paramCode == 6 || item.paramCode == 7 || item.paramCode == 8 || item.paramCode == 10){
    this.activeList = [{"paramCode":"1","paramDesc":"Random"},
                        {"paramCode":"0","paramDesc":"Not Random"}
                    ]
  }
  else if(item.paramCode == 5){
    this.activeList = [{"paramCode":"1","paramDesc":"Yes"},
                        {"paramCode":"0","paramDesc":"No"}
                    ]
  }
  else if(item.paramCode == 9){
    this.activeList = [{"paramCode":"0","paramDesc":"Vertical"},
                        {"paramCode":"1","paramDesc":"Horizontal"}
                    ]
  }
  else if(item.paramCode == 18){
    this.activeList = [{"paramCode":"0","paramDesc":"Vertical"},
                        {"paramCode":"1","paramDesc":"Horizontal"},
                        {"paramCode":"2","paramDesc":"Both"}
                    ]
  }

//------------value list--------------------
if(item.paramCode == 5){
  let tempValueList = [];
  for(let i=1;i<=10;i++){
    let json = {"paramCode":i,"paramDesc":i+" "}
    tempValueList.push(json);
  }
  this.valueList = tempValueList;
}
else if(item.paramCode == 7){
    this.valueList = [{"paramCode":"0","paramDesc":"Any Date"},
                        {"paramCode":"1","paramDesc":"Only Past Date"},
                        {"paramCode":"2","paramDesc":"Only Future Date"},
                    ];
  }
  
  else if(item.paramCode == 13){
    this.valueList = [{"paramCode":"1","paramDesc":"Address"},
                        {"paramCode":"2","paramDesc":"Street name"},
                        {"paramCode":"3","paramDesc":"Locality"},
                        {"paramCode":"4","paramDesc":"City"},
                        {"paramCode":"5","paramDesc":"State"},
                        {"paramCode":"6","paramDesc":"Pincode"},
                        {"paramCode":"7","paramDesc":"Country"}
                    ];
  }
  else if(item.paramCode == 16){
    this.correctList = [{"paramCode":"0","paramDesc":"Display on browser"},
                        {"paramCode":"1","paramDesc":"Display on app browser"}
                    ];
  }

  //----------size list---------------------------
  if(item.paramCode == 4.0){
    this.sizeList = [
                        {"paramCode":"0","paramDesc":"Checkbox"}
                    ];
    this.selectedSizeList = this.sizeList;
    this.isSizeSelectDisabled= true;
  }
  else if(item.paramCode == 4.1){
    this.sizeList = [
                        {"paramCode":"1","paramDesc":"Radio"}
                    ];
    this.selectedSizeList = this.sizeList;
    this.isSizeSelectDisabled= true;
  }
  else if(item.paramCode == 7){
    this.sizeList = [{"paramCode":"0","paramDesc":"Date"},
                        {"paramCode":"1","paramDesc":"Time"},
                        {"paramCode":"2","paramDesc":"Datetime"},
                    ];
  }
  else if(item.paramCode == 8){
    let tempSizeList = [];
    for(let i=0;i<=10;i++){
      let json = {"paramCode":i,"paramDesc":i+" "}
      tempSizeList.push(json);
    }
    this.sizeList = tempSizeList;
  }
  else if(item.paramCode == 9){
    let tempSizeList = [];
    for(let i=0;i<=100;i++){
      let json = {"paramCode":i,"paramDesc":i+" "}
      tempSizeList.push(json);
    }
    this.sizeList = tempSizeList;
  }
  else if(item.paramCode == 10){
    this.sizeList = [{"paramCode":"0","paramDesc":"No smart Search"},
                        {"paramCode":"1","paramDesc":"Smart Search"}
                    ];
  }

  else if(item.paramCode == 15){
    this.sizeList = [{"paramCode":"0","paramDesc":"Bar Code"},
                        {"paramCode":"1","paramDesc":"QR Code"}
                    ];
  }
  
  else if(item.paramCode == 17){
    this.sizeList = [{"paramCode":"0","paramDesc":"Right"},
                        {"paramCode":"1","paramDesc":"Center"},
                        {"paramCode":"2","paramDesc":"Left"},
                    ];
  }


}

onSelectLogic(item, opNo){
  let currectValue = $("#logicTxtBox"+opNo).val();
  $("#logicTxtBox"+opNo).val("");
  let logicArr = currectValue.split(",");
  if(currectValue == "") logicArr = [];
  logicArr.push(item.paramCode);
  // console.log(logicArr)
  let logicTxtBox = CommonFunction.prepareCommaSeprateValue(logicArr);
  $("#logicTxtBox"+opNo).val(logicTxtBox);
}
onDeselectLogic(item, opNo){
  let currectValue = $("#logicTxtBox"+opNo).val();
  $("#logicTxtBox"+opNo).val("");
  let logicArr = currectValue.split(",");

  let index = logicArr.indexOf(item.paramCode);
  if (index !== -1) {
    logicArr.splice(index, 1);
  }
  $("#logicTxtBox"+opNo).val("");
  let logicTxtBox = CommonFunction.prepareCommaSeprateValue(logicArr);
  $("#logicTxtBox"+opNo).val(logicTxtBox);
}
onSelectAllLogic(item, opNo){
  let logicArr = [];
  for(let i=0;i<item.length;i++){
    logicArr.push(item[i].paramCode);
  }
  $("#logicTxtBox"+opNo).val("");
  let logicTxtBox = CommonFunction.prepareCommaSeprateValue(logicArr);
  $("#logicTxtBox"+opNo).val(logicTxtBox);
}
onDeselectAllLogic(item, opNo){
  let logicArr = [];
  let logicTxtBox = CommonFunction.prepareCommaSeprateValue(logicArr);
  $("#logicTxtBox"+opNo).val(logicTxtBox);
}
// saveValue(){
//   let optionValue = "";
//   $(".optionValue").each(function(){
//     optionValue += $(this).val()+",";
//   });
//   this.optionValue = optionValue.substring(0,optionValue.length-1);
// }
// getCorrectOption(){
//   let correctOption = "";
//   $(".optionNo").each(function(){
//     let isChecked = $(this).prop("checked");
//     if(isChecked){
//       correctOption += $(this).attr("value")+",";
//     }
//   });
//   this.correct = correctOption.substring(0,correctOption.length-1);
// }

// getCorrectPercentOption(){
//   let correctPercentSlider = "";
//   $(".correctPercentSlider").each(function(){
//     correctPercentSlider += $(this).attr("aria-valuenow")+",";
//   });
//   this.score = correctPercentSlider.substring(0,correctPercentSlider.length-1);
// }

getAllCheckpointList(){
  this.checkpointList = [];
  let jsonData = {
    loginEmpId : this.loginEmpId,
    loginEmpRole : this.loginEmpRole,
    tenentId : this.tenentId,
  }
  this.layoutComponent.ShowLoading = true
  this.sharedService.getAllListBySelectType(jsonData,"checkpoint")
  .subscribe((response) =>{
    //console.log(response);
    this.checkpointList = response.checkpointList;
    this.layoutComponent.ShowLoading = false
    
  },
  (error)=>{
    this.toastr.warning(Constant.returnServerErrorMessage("getAllCheckpointList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  });
}
getAllCheckpointListArr(){
  this.checkpointList = [];
  let jsonData = {
    loginEmpId : this.loginEmpId,
    loginEmpRole : this.loginEmpRole,
    tenentId : this.tenentId
  }
  this.sharedService.getAllListBySelectType(jsonData,"checkpointListArr")
  .subscribe((response) =>{
    //console.log(response);
    this.logicCheckpointList = response.checkpointListArr;
  },
  (error)=>{
    this.toastr.warning(Constant.returnServerErrorMessage("getAllCheckpointListArr"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  });
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

dependentOptionArr = [];
isDependentOption(opNo){
  // alert(opNo);
  let isChecked = $("#dependentCheckbox"+opNo).prop("checked");
  if(isChecked){
    $("#logicDiv"+opNo).show();
    this.dependentOptionArr.push(opNo);
  }
  else{
    $("#logicDiv"+opNo).hide();
    let index = this.dependentOptionArr.indexOf(opNo);
    if (index !== -1) {
      this.dependentOptionArr.splice(index, 1);
    }
  }
  
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
  if(optionNumber == 1 && !(fileName.indexOf(".mp4") > -1)){
    this.toastr.warning("only .mp4 format accepted, please choose right file.","Alert !");
    wrongFile = true;
  }
  else if(optionNumber == 1 && fileSize/1024/1024 > 10){
    this.toastr.warning("video size should be less then 10 MB, please choose right file.","Alert !");
    wrongFile = true;
  }
  else if(optionNumber == 2 && !(fileName.indexOf(".jpg") > -1 || fileName.indexOf(".jpeg") > -1 || fileName.indexOf(".png") > -1)){
    this.toastr.warning("only .jpg, .jpeg, .png format accepted, please choose right file.","Alert !");
    wrongFile = true;
  }
  else if(optionNumber == 2 && fileSize/1024 > 500){
    this.toastr.warning("Image size should be less then 500 KB, please choose right file.","Alert !");
    wrongFile = true;
  }
  var myReader: FileReader = new FileReader();
  // console.log(myReader);
  myReader.onloadend = (e) => {
    let image = myReader.result;
    if (optionNumber == 1) {
      this.videoBase64 = image;
      if(wrongFile){
        $("#videoBase64").val("");
        this.videoBase64 = "";
      }
    }
    else if (optionNumber == 2) {
      this.imageBase64 = image;
      if(wrongFile){
        $("#imageBase64").val("");
        this.imageBase64 = "";
      }
    }
  }
  myReader.readAsDataURL(file);
}

getAllList(){
  this.sharedService.getAllList('checkpoint', this.tenentId)
  .subscribe((response) =>{
    this.inputTypeList = response.inputTypeList;
    this.languageList = response.languageList;
  },
  (error)=>{
    this.toastr.warning(Constant.returnServerErrorMessage("getAllList"),"Alert !",{timeOut : this.alertFadeoutTime});
  });
}

// optionValueForSelection = "";
// correctValueForSelection = "";
validateOptionTypeData() : any{
  let tempValue = "";
  $(".optionValue").each(function(){
    if($(this).val() !="")
    tempValue += $(this).val()+",";
  });
  if(tempValue !=""){
    this.optionValue = tempValue.substring(0,tempValue.length-1);
  }
  else{
    this.optionValue = "";
  }

  // let tempCorrect = "";
  // $(".optionNo").each(function(){
  //   let isChecked = $(this).prop("checked");
  //   if(isChecked){
  //     tempCorrect += $(this).attr("value")+",";
  //   }
  // });
  // if(tempCorrect != ""){
  //   this.correct = tempCorrect.substring(0,tempCorrect.length-1);
  // }
  // else{
  //   this.correct = "";
  // }

  let correctPercentSlider = "";
  $(".correctPercentSlider").each(function(){
    correctPercentSlider += $(this).attr("aria-valuenow")+",";
  });
  this.score = correctPercentSlider.substring(0,correctPercentSlider.length-1);

  let logicTxtBox = "";
  let opNo = 0;
  $(".logicTxtBox").each(function(){
    opNo ++;
    let isDependent = $("#dependentCheckbox"+opNo).prop("checked");
    if(isDependent){
      logicTxtBox += $(this).val()+":";
    }
    // else{
    //   logicTxtBox += ":";
    // }
    
  });
  this.logic = logicTxtBox.substring(0,logicTxtBox.length-1);
  

  let selectNoOfOption = CommonFunction.createCommaSeprate(this.selectedMaxNoOfOption);
  // console.log(this.optionValueForSelection+" : "+selectNoOfOption);
  
  if(this.selectedMaxNoOfOption.length == 0){
    this.toastr.warning("please select no of option","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(this.optionValue.split(",").length != parseInt(selectNoOfOption)){
    this.toastr.warning("please sure you have enter all option value","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  // else if(this.correct == ""){
  //   this.toastr.warning("please check atleast one option","Alert !",{timeOut : this.alertFadeoutTime});
  //   return false;
  // }
  
  
  return true;
}

validateData(inputTypeId) : any{
  // alert(inputTypeId);
  if(this.description == ""){
    this.toastr.warning("please enter description value","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(this.selectedMandatoryList.length == 0){
    this.toastr.warning("please select Mandatory","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(this.selectedEditableList.length == 0){
    this.toastr.warning("please select Editable","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if((inputTypeId == "3.1" || inputTypeId == "11" || inputTypeId == "12"  || inputTypeId == "16" || inputTypeId == "21") 
    && this.optionValue == ""){
    this.toastr.warning("please enter "+this.valueHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(inputTypeId == "18" && this.videoBase64 == ""){
    this.toastr.warning("please "+this.videoBrowserHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(inputTypeId == "19" && this.imageBase64 == ""){
    this.toastr.warning("please "+this.imageBrowserHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  // else if(inputTypeId == "21" && !this.optionValue.trim().toLowerCase().startsWith("select") ){
  //   this.errorInQuery = true;
  //   this.queryInfo = "";
  //   this.queryColumn = "";
  //   this.sqlQueryError = "only `select` query is valid.";   
  //   return false;
  // }
  else if((inputTypeId == "5" || inputTypeId == "7") && this.selectedValueList.length == 0){
    this.toastr.warning("please select "+this.valueHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if((inputTypeId == "1" || inputTypeId == "2" || inputTypeId == "8" || inputTypeId == "9") && this.correct == ""){
    this.toastr.warning("please enter "+this.correctHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(inputTypeId == "16" && this.selectedCorrectList.length == 0){
    this.toastr.warning("please enter "+this.correctHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  
  else if((inputTypeId == "1" || inputTypeId == "2"  || inputTypeId == "12") && this.size == ""){
    this.toastr.warning("please enter "+this.sizeHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(inputTypeId == "3.0" && this.prefixSize == ""){
    this.toastr.warning("please enter "+this.sizeHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(inputTypeId == "3.0" && this.suffixSize == ""){
    this.toastr.warning("please enter "+this.sizeHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(inputTypeId == "3.0" && parseInt(this.suffixSize) > 4){
    this.toastr.warning(this.suffixSize+" should be less than 4","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if((inputTypeId == "5" || inputTypeId == "7" || inputTypeId == "8" || inputTypeId == "9" || 
  inputTypeId == "15" || inputTypeId == "17") && this.selectedSizeList.length == 0){
    this.toastr.warning("please select "+this.sizeHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if((inputTypeId == "4" || inputTypeId == "10") && !this.validateOptionTypeData()){
    return false;
  }
  else if((inputTypeId == "4" || inputTypeId == "10") && this.score == ""){
    this.toastr.warning("please enter score","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if(this.selectedLanguageList.length == 0){
    this.toastr.warning("please select language","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if((inputTypeId == "4" || inputTypeId == "9" || inputTypeId == "10") && this.selectedActiveList.length == 0){
    this.toastr.warning("please select "+this.activeHTML,"Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  else if((inputTypeId == "8" || inputTypeId == "9") && this.correct != "" && this.selectedLogicCheckpointList.length ==0){
    this.toastr.warning("please select alteast one logic ","Alert !",{timeOut : this.alertFadeoutTime});
    return false;
  }
  return true;
}

submitCheckpointData(type){

  let inputTypeId = CommonFunction.createCommaSeprate(this.selectedInputTypeList);
  
  if(inputTypeId == "4.0" || inputTypeId == "4.1"){
    inputTypeId = "4";
  }
  

  if(!this.validateData(inputTypeId)){
    return ;
  }

  if(inputTypeId == "3.0"){
    this.size = this.prefixSize+","+this.suffixSize;
  }
  if(inputTypeId == "3.0" || inputTypeId == "3.1"){
    inputTypeId = "3";
  }
  
  let languageId = CommonFunction.createCommaSeprate(this.selectedLanguageList);
  let isMandatory = CommonFunction.createCommaSeprate(this.selectedMandatoryList);
  let isEditable = CommonFunction.createCommaSeprate(this.selectedEditableList);
  let isActive = CommonFunction.createCommaSeprate(this.selectedActiveList);

  if(inputTypeId == "4" || inputTypeId == "8" || inputTypeId == "9" || inputTypeId == "10"
  || inputTypeId == "15" || inputTypeId == "17"){
    this.size = CommonFunction.createCommaSeprate(this.selectedSizeList);
    // this.dependent = CommonFunction.createCommaSeprate(this.selectedDepetendentList);
  }
  // if(inputTypeId == "4" || inputTypeId == "10"){
  //   this.saveValue();
  //   this.getCorrectOption();
  // }
  if(inputTypeId == "5"){
    this.size = CommonFunction.createCommaSeprate(this.selectedValueList);
    this.correct = CommonFunction.createCommaSeprate(this.selectedSizeList);
  }
  if(inputTypeId == "7"){
    this.correct = CommonFunction.createCommaSeprate(this.selectedValueList);
    this.size = CommonFunction.createCommaSeprate(this.selectedSizeList);
  }
  if(inputTypeId == "8" || inputTypeId == "9"){
    this.logic = CommonFunction.createCommaSeprate(this.selectedLogicCheckpointList);
  }
  if(inputTypeId == "13"){
    this.correct = CommonFunction.createCommaSeprate(this.selectedValueList);
  }

  if(inputTypeId == "16"){
    this.correct = CommonFunction.createCommaSeprate(this.selectedCorrectList);
  }

  // if((inputTypeId == "4" || inputTypeId == "10") && this.dependentOptionArr.length !=0){
  //   this.dependent = "1";
  // }
  if(this.logic !=""){
    this.dependent = "1";
  }

  let jsonData = {
    tenentId:this.tenentId,
    description : this.description,
    optionValue : this.optionValue,
    isMandatory : isMandatory,
    isEditable : isEditable,
    inputTypeId : inputTypeId,
    languageId : languageId,
    correct : this.correct,
    size : this.size,
    score : this.score,
    logic : this.logic,
    active : isActive,
    dependent : this.dependent,
    isSql : this.isSql,
    videoBase64 : this.videoBase64,
    imageBase64 : this.imageBase64,
    type : type
  }
  // console.log(JSON.stringify(jsonData));
  // this.spinner.show();
  this.errorInQuery = false;
  this.queryInfo = "";
  this.sqlQueryError = "";
  this.queryColumn = "";
  this.inProgress = true;
  this.sharedService.insertDataByInsertType(jsonData,"checkpoint")
  .subscribe((response) =>{
    //console.log(response);
    if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
      this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      this.setAllDefault();
      this.createCheckpointCount++;
      // this.getAllCheckpointList();
    }
    else if(response.responseCode == Constant.GENERIC_DATABASE_ERROR) {
      this.errorInQuery = true;
      this.sqlQueryError = response.responseDesc.split(":")[1];        
    }
    else if(response.responseCode == 200){
      this.errorInQuery = true;
      this.queryColumn = "Please validate Query column "+response.responseDesc.split(":")[1]+", If its correct then click on `Save Query` button else click on `Cancel`"; 
      this.columnValueArr = response.columnValueArr;
    }
    else{
      this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime}); 
    }// this.spinner.hide();
    this.inProgress = false;
    
  },
  (error)=>{
    this.toastr.warning(Constant.returnServerErrorMessage("submitCheckpointData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  });
}

setAllDefault(){
  this.description = "";
  this.optionValue = "";
  this.selectedInputTypeList = [];
  this.selectedLanguageList = [];
  this.selectedMandatoryList = [];
  this.selectedEditableList = [];
  this.correct = "";
  this.size = "";
  this.score = "";
  this.logic = "";
  this.dependent = "0";
  this.makeAsDefaultAllFields();
}


}
