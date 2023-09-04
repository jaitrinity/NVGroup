import { DatePipe } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../layout/layout.component';
import { Constant } from '../shared/constant/Contant';
import { GraphService } from '../shared/service/GraphService';
import * as alasql from 'alasql';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('menu1') menu1: MatMenuTrigger;
  @ViewChild('menu2') menu2: MatMenuTrigger;
  @ViewChild('menu3') menu3: MatMenuTrigger;
  @ViewChild('menu4') menu4: MatMenuTrigger;
  @ViewChild('menu5') menu5: MatMenuTrigger;
  @ViewChild('menu6') menu6: MatMenuTrigger;
  @ViewChild('menu7') menu7: MatMenuTrigger;
  @ViewChild('menu8') menu8: MatMenuTrigger;
  @ViewChild('menu9') menu9: MatMenuTrigger;
  @ViewChild('menu10') menu10: MatMenuTrigger;
  @ViewChild('menu11') menu11: MatMenuTrigger;
  @ViewChild('menu12') menu12: MatMenuTrigger;
  @ViewChild('menu13') menu13: MatMenuTrigger;
  
  public monthList = [];
  public incidentCategoryList = [];
  public siteTypeList = [];
  public metroSiteTypeList = [];
  public trainingNameList = [];
  public trainingName = "";
  public trainingName2 = "";
  public stateList = [];
  public state = "";
  public quarterList = [
    {paramCode : 'Q1', paramDesc : 'AMJ (Q1)'},
    {paramCode : 'Q2', paramDesc : 'JAS (Q2)'},
    {paramCode : 'Q3', paramDesc : 'OND (Q3)'},
    {paramCode : 'Q4', paramDesc : 'JFM (Q4)'},
  ]
  public quarter = "";
  public quarter1 = "";
  public quarter2 = "";
  public quarter3 = "";
  public quarter4 = "";
  public quarter5 = "";
  public quarter6 = "";
  public quarter7 = "";
  public siteType = "";
  public metroSiteType = "";
  public monthYear1 = "";
  public isFiberCut : boolean = true;
  public incidentCategory1 = "";
  
  public monthYear3 = "";
  public isTechnician : boolean = false;

  public noDataFound1 : boolean = false;
  public noDataFound2 : boolean = false;
  public noDataFound3 : boolean = false;
  public noDataFound4 : boolean = false;
  public noDataFound5 : boolean = false;
  public noDataFound6 : boolean = false;
  public noDataFound7 : boolean = false;
  public noDataFound8 : boolean = false;
  public noDataFound9 : boolean = false;
  public noDataFound10 : boolean = false;
  public noDataFound11 : boolean = false;
  public noDataFound12 : boolean = false;

  public inProgress1 : boolean = false;
  public inProgress2 : boolean = false;
  public inProgress3 : boolean = false;
  public inProgress4 : boolean = false;
  public inProgress5 : boolean = false;
  public inProgress6 : boolean = false;
  public inProgress7 : boolean = false;
  public inProgress8 : boolean = false;
  public inProgress9 : boolean = false;
  public inProgress10 : boolean = false;
  public inProgress11 : boolean = false;
  public inProgress12 : boolean = false;

  public graphDiv1 : boolean = false;
  public graphDiv2 : boolean = false;
  public graphDiv3 : boolean = false;
  public graphDiv4 : boolean = false;
  public graphDiv5 : boolean = false;
  public graphDiv6 : boolean = false;
  public graphDiv7 : boolean = false;
  public graphDiv8 : boolean = false;
  public graphDiv9 : boolean = false;
  public graphDiv10 : boolean = false;
  public graphDiv11 : boolean = false;
  public graphDiv12 : boolean = false;
  
  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    scaleShowValues: true
  };
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartColors : any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public pieTableColumn = [];
  public pieTableData = [];
  public totalFibercut = "";

  public pieChartLabels2 = [];
  public pieChartData2 = [];
  public pieChartColors2 : any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public pieTableColumn2 = [];
  public pieTableData2 = [];

  public pieChartLabels3 = [];
  public pieChartData3 = [];
  public pieChartColors3 : any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public pieTableColumn3 = [];
  public pieTableData3 = [];
  public trainingTableStr = "";
  public pmTableStr = "";
  public passPercentage = "";

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}},
          max : 0
        }
        // position : 'right'
      }]
    }
  };
  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}},
          max : 0
        }
        // position : 'right'
      }]
    }
  };
  public barChartOptions3 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}},
          max : 0
        }
      }]
    }
  };
 

  public barChartOptions4 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index]+" %";
                  // if(data == "100 %"){
                    // ctx.fillText(data, bar._model.x, bar._model.y + 20);
                  // }
                  // else{
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  // } 
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          stepSize : 10,
          max : 110
        }
      }]
    }
  };
  public barChartOptions5 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}},
          max : 0
        }
      }]
    }
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartColors: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barChartLegend = false;
  public barChartData = [];
  public barTableColumn = [];
  public barTableData = [];

  public barChartLabels3 = [];
  public barChartData3 = [];
  public barChartColors3: any[] = [
    {backgroundColor : [], borderColor : []}
  ];

  public barChartLabels33 = [];
  public barChartData33 = [];
  public barChartColors33: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn3 = [];
  public barTableData3 = [];

  public barChartLabels4 = [];
  public barChartData4 = [];
  public barChartColors4: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn4 = [];
  public barTableData4 = [];
  public pmPercentage = "";

  public barChartLabels5 = [];
  public barChartData5 = [];
  public barChartColors5: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn5 = [];
  public barTableData5 = [];
  public pmPercentage1 = "";

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'top',
    },
    elements: {
      line: {
          tension: 0
      }
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = '#000000';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  if(!(data == 10 || data == 50 || data == 100 || data == 150 || data == 49)){
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  }
                  else{
                    ctx.fillStyle = '#ffffff00';
                  }
                  
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
        }
      }]
    }
    
  };
  public lineChartLabels = [];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [];
  public lineChartColor: any[] = [
    {pointBackgroundColor : [], backgroundColor : ["#ffffff00"], borderColor : ["#80705c"]},
    {pointBackgroundColor : [], backgroundColor : ["#ffffff00"], borderColor : ["#d7ac65"]},
    {pointBackgroundColor : [], backgroundColor : ["#ffffff00"], borderColor : ["#000000"]}
  ];
  public lineTableColumn = [];
  public lineTableData = [];

  public barChartLabels6 = [];
  public barChartData6 = [];
  public barChartColors6: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn6 = [];
  public barTableData6 = [];

  public barChartOptions6 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}},
          max : 0
        }
      }]
    }
  };

  public barChartOptions7 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index]+" %";
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          stepSize : 10,
          max : 0
        }
      }]
    }
  };

  public barChartLabels7 = [];
  public barChartData7 = [];
  public barChartColors7: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn7 = [];
  public barTableData7 = [];
  public totalRepeatCount = "";

  public barChartLabels8 = [];
  public barChartData8 = [];
  public barChartColors8: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn8 = [];
  public barTableData8 = [];

  public barChartOptions8 = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'right',
    },
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index]+" %";
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    },
    scales : {
      yAxes : [{
        display : true,
        ticks :{
          beginAtZero: true,
          stepSize : 10,
          max : 0
        }
      }]
    }
  };

  public barChartLabels9 = [];
  public barChartData9 = [];
  public barChartColors9: any[] = [
    {backgroundColor : [], borderColor : []}
  ];
  public barTableColumn9 = [];
  public barTableData9 = [];

  public tableData = [];
  public quesPercentageArr = [];
  public trQuesGraphArr = [];


  // public pieChartLabels = ['Profit Q1', 'Profit Q2', 'Profit Q3', 'Profit Q4'];
  // public pieChartData = [83, 91, 107, 73];
  // public pieChartType = 'pie';

  // public lineChartLabels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006'];
  // public lineChartType = 'line';
  // public lineChartLegend = true;
  // public lineChartData = [
  //   {data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A'},
  //   {data: [48, 38, 65, 39, 66, 17, 80], label: 'Series B'}
  // ];

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  // };
  // public barChartLabels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A'},
  //   {data: [48, 38, 65, 39, 66, 17, 80], label: 'Series B'}
  // ];
  public financialYearList = [];
  public financialYear = "";
  public currentYear = "";
  public tenentId = "";
  public button = "";
  public color1 = "";
  public color2 = "";
  public loginEmpId = "";
  public loginEmpRole = "";
  public loginEmpRoleId = "";
  constructor(private graphService : GraphService,private datePipe : DatePipe,
    private layoutComponent : LayoutComponent, private toastr: ToastrService) {
    this.loginEmpId = localStorage.getItem("empId");
    this.loginEmpRole = localStorage.getItem("loginEmpRole");
    this.loginEmpRoleId = localStorage.getItem("empRoleId");
    let state = localStorage.getItem("state");
    // Technician
    if(this.loginEmpRoleId == "43"){
      this.isTechnician = true;
    }
    else{
      // CDH || O&M Lead
      if(this.loginEmpRoleId == "44" || this.loginEmpRoleId == "45")
        this.state = state;
      else
        this.state = "APTL";
    }
    this.tenentId = localStorage.getItem("tenentId");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
    this.layoutComponent.setPageTitle("Dashboard");
  }

  ngOnInit(): void {
    let currentMonth = this.datePipe.transform(new Date(),'MMM');
    this.currentYear = this.datePipe.transform(new Date(),'yyyy');
    let previousYear = parseInt(this.currentYear) - 1;
    let nextYear = parseInt(this.currentYear) + 1;
    if(currentMonth == 'Jan' || currentMonth == 'Feb' || currentMonth == 'Mar'){
      this.monthList  = [
        {"paramCode" : "Apr-"+previousYear,"paramDesc":"Apr-"+previousYear},
        {"paramCode" : "May-"+previousYear,"paramDesc":"May-"+previousYear},
        {"paramCode" : "Jun-"+previousYear,"paramDesc":"Jun-"+previousYear},
        {"paramCode" : "Jul-"+previousYear,"paramDesc":"Jul-"+previousYear},
        {"paramCode" : "Aug-"+previousYear,"paramDesc":"Aug-"+previousYear},
        {"paramCode" : "Sep-"+previousYear,"paramDesc":"Sep-"+previousYear},
        {"paramCode" : "Oct-"+previousYear,"paramDesc":"Oct-"+previousYear},
        {"paramCode" : "Nov-"+previousYear,"paramDesc":"Nov-"+previousYear},
        {"paramCode" : "Dec-"+previousYear,"paramDesc":"Dec-"+previousYear},
        {"paramCode" : "Jan-"+this.currentYear,"paramDesc":"Jan-"+this.currentYear},
        {"paramCode" : "Feb-"+this.currentYear,"paramDesc":"Feb-"+this.currentYear},
        {"paramCode" : "Mar-"+this.currentYear,"paramDesc":"Mar-"+this.currentYear}
      ]
      
    }
    else{
      this.monthList  = [
        {"paramCode" : "Apr-"+this.currentYear,"paramDesc":"Apr-"+this.currentYear},
        {"paramCode" : "May-"+this.currentYear,"paramDesc":"May-"+this.currentYear},
        {"paramCode" : "Jun-"+this.currentYear,"paramDesc":"Jun-"+this.currentYear},
        {"paramCode" : "Jul-"+this.currentYear,"paramDesc":"Jul-"+this.currentYear},
        {"paramCode" : "Aug-"+this.currentYear,"paramDesc":"Aug-"+this.currentYear},
        {"paramCode" : "Sep-"+this.currentYear,"paramDesc":"Sep-"+this.currentYear},
        {"paramCode" : "Oct-"+this.currentYear,"paramDesc":"Oct-"+this.currentYear},
        {"paramCode" : "Nov-"+this.currentYear,"paramDesc":"Nov-"+this.currentYear},
        {"paramCode" : "Dec-"+this.currentYear,"paramDesc":"Dec-"+this.currentYear},
        {"paramCode" : "Jan-"+nextYear,"paramDesc":"Jan-"+nextYear},
        {"paramCode" : "Feb-"+nextYear,"paramDesc":"Feb-"+nextYear},
        {"paramCode" : "Mar-"+nextYear,"paramDesc":"Mar-"+nextYear}
      ]
    }
    let previousFinancialYear = previousYear+" - "+this.currentYear;
    let currentFinancialYear = this.currentYear+" - "+nextYear;
    this.financialYearList.push(previousFinancialYear);
    this.financialYearList.push(currentFinancialYear);
    this.financialYear = currentFinancialYear;
    if(!this.isTechnician){
      this.siteType = "Small Cell";
      this.metroSiteType = "DMRC";
      this.getIncidentCategoryList();
      this.getSiteTypeList();
      this.findQuarterValue();
    }
  }

  findQuarterValue(){
    let currentMonth = this.datePipe.transform(new Date(),'MMM');
    this.monthYear1 = currentMonth+"-"+this.currentYear;
    if(currentMonth == 'Apr' || currentMonth == 'May' || currentMonth == 'Jun')
      this.quarter = 'Q1';
    else if(currentMonth == 'Jul' || currentMonth == 'Aug' || currentMonth == 'Sep')
      this.quarter = 'Q2';
    else if(currentMonth == 'Oct' || currentMonth == 'Nov' || currentMonth == 'Dec')
      this.quarter = 'Q3';
    else if(currentMonth == 'Jan' || currentMonth == 'Feb' || currentMonth == 'Mar')
      this.quarter = 'Q4';
  }

  ngAfterViewInit(): void {
    if(!this.isTechnician){
      this.incidentCategory1 = 'Fiber Cut';
      this.generateGraph1();
      this.quarter5 = this.quarter;
      this.generateGraph2();
      this.monthYear3 = this.monthYear1;
      this.generateGraph3();
      this.generateAllPMGraph(this.quarter);
      this.quarter6 = this.quarter;
      this.generateGraph9();
      this.trainingName = 'Coslight Batteries';
      this.generateAllTrainingGraph(this.trainingName);
    }
  }

  getSiteTypeList(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole
    };
    this.graphService.getAllListBySelectType(jsonData, 'siteType')
    .subscribe(
      (result)=>{
        let st = result.siteType;
        this.siteTypeList = st;

        let mst = result.metroSiteType;
        this.metroSiteTypeList = mst;

        let trn = result.trainingName;
        this.trainingNameList = trn;

        let state = result.state;
        this.stateList = state;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("getSiteTypeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    );
  }

  getIncidentCategoryList(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole
    };
    this.graphService.getAllListBySelectType(jsonData, 'incidentCategory')
    .subscribe(
      (result)=>{
        let ic = result.incidentCategory;
        let splitList = ic.split(",");
        let tempData = [];
        for(let i=0;i<splitList.length;i++){
          let tempJson = {
            'paramCode':splitList[i],'paramDesc':splitList[i]+" "
          };
          tempData.push(tempJson)
        }
        this.incidentCategoryList = tempData;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("getIncidentCategoryList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    );
  }

  public generateInciGraphMonthWise(monthYear : any){
    this.monthYear1 = monthYear;
    this.generateGraph1();

    this.monthYear3 = monthYear;
    this.generateGraph3();
  }

  public generateInciGraphQuarterWise(quarter : any){
    this.quarter5 = quarter;
    this.generateGraph2()

    this.quarter6 = quarter;
    this.generateGraph9()

  }

  public generateGraph1(){
    if(this.monthYear1 == ""){
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.pieChartColors[0].backgroundColor = [];
      this.pieTableColumn = [];
      this.pieTableData = [];
      this.incidentCategory1 = "";
      alert("Please select month");
      return ;
    }
    if(this.incidentCategory1 != 'Fiber Cut') 
      this.isFiberCut = false 
    else 
      this.isFiberCut = true;

    this.menu1.closeMenu();
    this.inProgress1 = true;
    this.graphDiv1 = !this.inProgress1;
    this.noDataFound1 = !this.inProgress1;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      period : this.monthYear1,
      incidentCategory : this.incidentCategory1,
      graphType : 1
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.pieChartLabels = result.labelArr;
        this.pieChartData = result.dataArr;
        this.pieChartColors[0].backgroundColor = result.colorArr;
        this.pieTableColumn = result.tableColumn;
        this.pieTableData = result.tableData;
        this.totalFibercut = result.totalCount;
        this.inProgress1 = false;
        if(this.pieChartLabels.length != 0)
          this.graphDiv1 = !this.inProgress1;
        else
          this.noDataFound1 = !this.inProgress1;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph1"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  public generateGraph2(){
    if(this.quarter5 == ""){
      this.barChartLabels = [];
      this.barChartData = [];
      this.barChartColors[0].backgroundColor = [];
      this.barTableColumn = [];
      this.barTableData = [];
      alert("Please select quarter");
      return ;
    }
    this.menu2.closeMenu();
    this.inProgress2 = true;
    this.graphDiv2 = !this.inProgress2;
    this.noDataFound2 = !this.inProgress2;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter5,
      graphType : 2
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels = result.labelArr;
        this.barChartData = result.dataArr;
        this.barChartColors[0].backgroundColor = result.colorArr;
        this.barTableColumn = result.tableColumn;
        this.barTableData = result.tableData;
        this.barChartOptions.scales.yAxes[0].ticks.max = result.maxValue;
        this.inProgress2 = false;
        if(this.barChartLabels.length !=0)
          this.graphDiv2 = !this.inProgress2;
        else
          this.noDataFound2 = !this.inProgress2;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph2"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  public generateGraph3(){
    if(this.monthYear3 == ""){
      this.barChartLabels3 = [];
      this.barChartData3 = [];
      this.barChartColors3[0].backgroundColor = [];
      this.barChartColors3[1].backgroundColor = [];
      this.barTableColumn3 = [];
      this.barTableData3 = [];
      alert("Please select month");
      return ;
    }
    this.menu3.closeMenu();
    this.inProgress3 = true;
    this.graphDiv3 = !this.inProgress3;
    this.noDataFound3 = !this.inProgress3;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      period : this.monthYear3,
      graphType : 3
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels3 = result.labelArr;
        this.barChartData3[0] = result.dataArr[0];
        this.barChartColors3[0].backgroundColor = result.colorArr;
        this.barChartOptions2.scales.yAxes[0].ticks.max = result.maxValue;

        this.barChartLabels33 = result.labelArr;
        this.barChartData33[0] = result.dataArr[1];
        this.barChartColors33[0].backgroundColor = result.colorArr1;
        this.barChartOptions3.scales.yAxes[0].ticks.max = result.maxValue1;

        this.barTableColumn3 = result.tableColumn;
        this.barTableData3 = result.tableData;
        this.inProgress3 = false;
        if(this.barChartLabels3.length != 0)
          this.graphDiv3 = !this.inProgress3;
        else
          this.noDataFound3 = !this.inProgress3;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph3"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  public generateGraph4(){
    if(this.quarter == ""){
      this.barChartLabels4 = [];
      this.barChartData4 = [];
      this.barChartColors4[0].backgroundColor = [];
      this.barTableColumn4 = [];
      this.barTableData4 = [];
      alert("Please select a quarter");
      return ;
    }
    
    this.menu4.closeMenu();
    this.inProgress4 = true;
    this.graphDiv4 = !this.inProgress4;
    this.noDataFound4 = !this.inProgress4;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter,
      graphType : 4
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels4 = result.labelArr;
        this.barChartData4 = result.dataArr;
        this.barChartColors4[0].backgroundColor = result.colorArr;
        this.barTableColumn4 = result.tableColumn;
        this.barTableData4 = result.tableData;
        this.pmPercentage = result.total;
        this.inProgress4 = false;
        if(this.barChartLabels4.length != 0)
          this.graphDiv4 = !this.inProgress4;
        else
          this.noDataFound4 = !this.inProgress4;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph4"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  public generateAllPMGraph(quarter : any){
    this.quarter = quarter;
    this.generateGraph4();

    this.quarter1 = quarter;
    this.generateGraph5();

    this.quarter3 = quarter;
    this.generateGraph7();

    this.quarter2 = quarter;
    this.generateGraph8();

    this.quarter4 = quarter;
    this.generateGraph6();

    this.quarter7 = quarter;
    this.generateGraph11();
  }

  public generateGraph5(){
    if(this.quarter1 == ""){
      this.barChartLabels5 = [];
      this.barChartData5 = [];
      this.barChartColors5[0].backgroundColor = [];
      this.barTableColumn5 = [];
      this.barTableData5 = [];
      this.siteType = "";
      alert("Please select a quarter");
      return ;
    }
    this.menu5.closeMenu();
    this.inProgress5 = true;
    this.graphDiv5 = !this.inProgress5;
    this.noDataFound5 = !this.inProgress5;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter1,
      siteType : this.siteType,
      graphType : 5
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels5 = result.labelArr;
        this.barChartData5 = result.dataArr;
        this.barChartColors5[0].backgroundColor = result.colorArr;
        this.barTableColumn5 = result.tableColumn;
        this.barTableData5 = result.tableData;
        this.pmPercentage1 = result.total;
        this.inProgress5 = false;
        if(this.barChartLabels5.length != 0)
          this.graphDiv5 = !this.inProgress5;
        else
          this.noDataFound5 = !this.inProgress5;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph5"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  generateGraph6(){
    this.pieChartLabels2 = [];
    this.pieChartData2 = [];
    this.pieChartColors2[0].backgroundColor = [];
    this.pieTableColumn2 = [];
    this.pieTableData2 = [];
    if(this.quarter4 == ""){
      alert("Please select quarter");
      return ;
    }
    else if(this.metroSiteType == ""){
      alert("Please select site type");
      return ;
    }

    this.generateGraph13();
    this.menu6.closeMenu();
    this.inProgress6 = true;
    this.graphDiv6 = !this.inProgress6;
    this.noDataFound6 = !this.inProgress6;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter4,
      metroSiteType : this.metroSiteType,
      graphType : 6
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.pieChartLabels2 = result.labelArr;
        this.pieChartData2 = result.dataArr;
        this.pieChartColors2[0].backgroundColor = result.colorArr;
        this.pieTableColumn2 = result.tableColumn;
        this.pieTableData2 = result.tableData;
        this.inProgress6 = false;
        if(this.pieChartLabels2.length != 0)
          this.graphDiv6 = !this.inProgress6;
        else
          this.noDataFound6 = !this.inProgress6;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph6"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  generateGraph7(){
    if(this.quarter3 == ""){
      this.lineChartLabels = [];
      this.lineChartData = [];
      this.lineChartColor[0].pointBackgroundColor = [];
      this.lineTableColumn = [];
      this.lineTableData = [];
      alert("Please select a quarter");
      return ;
    }
    this.menu7.closeMenu();
    this.inProgress7 = true;
    this.graphDiv7 = !this.inProgress7;
    this.noDataFound7 = !this.inProgress7;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter3,
      graphType : 7
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.lineChartLabels = result.labelArr;
        this.lineChartData = result.dataArr;
        this.lineChartColor[0].pointBackgroundColor = result.colorArr;
        this.lineChartColor[1].pointBackgroundColor = result.colorArr;
        this.lineChartColor[2].pointBackgroundColor = result.colorArr;
        this.lineTableColumn = result.tableColumn;
        this.lineTableData = result.tableData;
        this.inProgress7 = false;
        if(this.lineChartLabels.length != 0)
          this.graphDiv7 = !this.inProgress7;
        else
          this.noDataFound7 = !this.inProgress7;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph7"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  generateGraph8(){
    if(this.quarter2 == ""){
      this.barChartLabels6 = [];
      this.barChartData6 = [];
      this.barChartColors6[0].backgroundColor = [];
      this.barTableColumn6 = [];
      this.barTableData6 = [];
      alert("Please select a quarter");
      return ;
    }
    this.menu8.closeMenu();
    this.inProgress8 = true;
    this.graphDiv8 = !this.inProgress8;
    this.noDataFound8 = !this.inProgress8;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter2,
      graphType : 8
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels6 = result.labelArr;
        this.barChartData6 = result.dataArr;
        this.barChartColors6[0].backgroundColor = result.colorArr;
        this.barTableColumn6 = result.tableColumn;
        this.barTableData6 = result.tableData;
        this.barChartOptions5.scales.yAxes[0].ticks.max = result.maxValue;
        this.inProgress8 = false;
        if(this.barChartLabels6.length != 0)
          this.graphDiv8 = !this.inProgress8;
        else
          this.noDataFound8 = !this.inProgress8;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph8"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  generateGraph9(){
    if(this.quarter6 == ""){
      this.barChartLabels7 = [];
      this.barChartData7 = [];
      this.barChartColors7[0].backgroundColor = [];
      this.barTableColumn7 = [];
      this.barTableData7 = [];
      alert("Please select a quarter");
      return ;
    }
    this.menu9.closeMenu();
    this.inProgress9 = true;
    this.graphDiv9 = !this.inProgress9;
    this.noDataFound9 = !this.inProgress9;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter6,
      graphType : 9
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels7 = result.labelArr;
        this.barChartData7 = result.dataArr;
        this.barChartColors7[0].backgroundColor = result.colorArr;
        this.barTableColumn7 = result.tableColumn;
        this.barTableData7 = result.tableData;
        this.barChartOptions6.scales.yAxes[0].ticks.max = result.maxValue;
        this.totalRepeatCount = result.totalCount;
        this.inProgress9 = false;
        if(this.barChartLabels7.length != 0)
          this.graphDiv9 = !this.inProgress9;
        else
          this.noDataFound9 = !this.inProgress9;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph9"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  public generateAllTrainingGraph(trainingName : any){
    this.trainingName = trainingName;
    this.generateGraph10();

    this.trainingName2 = trainingName;
    this.generateGraph12();

    this.generateGraph14();
  }

  generateGraph10(){
    if(this.trainingName == ""){
      this.barChartLabels8 = [];
      this.barChartData8 = [];
      this.barChartColors8[0].backgroundColor = [];
      this.barTableColumn8 = [];
      this.barTableData8 = [];
      alert("Please select a training");
      return ;
    }
    
    this.menu10.closeMenu();
    this.inProgress10 = true;
    this.graphDiv10 = !this.inProgress10;
    this.noDataFound10 = !this.inProgress10;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      trainingName : this.trainingName,
      state : this.state,
      graphType : 10
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels8 = result.labelArr;
        this.barChartData8 = result.dataArr;
        this.barChartColors8[0].backgroundColor = result.colorArr;
        this.barTableColumn8 = result.tableColumn;
        this.barTableData8 = result.tableData;
        this.barChartOptions7.scales.yAxes[0].ticks.max = result.maxValue;
        this.inProgress10 = false;
        if(this.barChartLabels8.length != 0)
          this.graphDiv10 = !this.inProgress10;
        else
          this.noDataFound10 = !this.inProgress10;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph10"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  generateGraph11(){
    if(this.quarter7 == ""){
      this.barChartLabels9 = [];
      this.barChartData9 = [];
      this.barChartColors9[0].backgroundColor = [];
      this.barTableColumn9 = [];
      this.barTableData9 = [];
      alert("Please select a quarter");
      return ;
    }
    this.menu11.closeMenu();
    this.inProgress11 = true;
    this.graphDiv11 = !this.inProgress11;
    this.noDataFound11 = !this.inProgress11;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter7,
      graphType : 11
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.barChartLabels9 = result.labelArr;
        this.barChartData9 = result.dataArr;
        this.barChartColors9[0].backgroundColor = result.colorArr;
        this.barTableColumn9 = result.tableColumn;
        this.barTableData9 = result.tableData;
        this.barChartOptions8.scales.yAxes[0].ticks.max = result.maxValue;
        this.inProgress11 = false;
        if(this.barChartLabels9.length != 0)
          this.graphDiv11 = !this.inProgress11;
        else
          this.noDataFound11 = !this.inProgress11;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph11"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  generateGraph12(){
    this.pieChartLabels3 = [];
    this.pieChartData3 = [];
    this.pieChartColors3[0].backgroundColor = [];
    this.pieTableColumn3 = [];
    this.pieTableData3 = [];
    if(this.trainingName2 == ""){
      alert("Please select training name");
      return;
    }
    else if(this.state == ""){
      alert("Please select a state");
      return ;
    }
    this.menu12.closeMenu();
    this.inProgress12 = true;
    this.graphDiv12 = !this.inProgress12;
    this.noDataFound12 = !this.inProgress12;
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      trainingName : this.trainingName2,
      state : this.state,
      graphType : 12
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.pieChartLabels3 = result.labelArr;
        this.pieChartData3 = result.dataArr;
        this.pieChartColors3[0].backgroundColor = result.colorArr;
        this.pieTableColumn3 = result.tableColumn;
        this.pieTableData3 = result.tableData;
        this.trainingTableStr = result.tableStr;
        this.passPercentage = result.passPercentage;
        this.inProgress12 = false;
        if(this.pieChartLabels3.length != 0)
          this.graphDiv12 = !this.inProgress12;
        else
          this.noDataFound12 = !this.inProgress12;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph12"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  public generateGraph13(){
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      financialYear : this.financialYear,
      quarter : this.quarter4,
      metroSiteType : this.metroSiteType,
      graphType : 13
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.pmTableStr = result.tableStr;
        this.tableData = result.dataArr;
        this.inProgress6 = false;
        if(this.pieChartLabels2.length != 0)
          this.graphDiv6 = !this.inProgress6;
        else
          this.noDataFound6 = !this.inProgress6;
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph13"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }

  public generateGraph14(){
    this.menu13.closeMenu();
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      trainingName : this.trainingName,
      graphType : 14
    }
    this.graphService.gererateGraph(jsonData)
    .subscribe(
      (result)=>{
        this.quesPercentageArr = result.dataArr;
        this.trQuesGraphArr = [];
        for(let i=0;i<this.quesPercentageArr.length;i++){
          let quesObj = this.quesPercentageArr[i];
          let ques = quesObj.question;
          let currPer = quesObj.correctPercentage;
          let inCurrPer = quesObj.inCorrectPercentage;
          let labelArr = [];
          labelArr.push("Correct - "+currPer+" %"); labelArr.push("Incorrect - "+inCurrPer+" %");
          let dataArr = [];
          dataArr.push(currPer); dataArr.push(inCurrPer);
          let colorArr = [
            {
              backgroundColor : []
            }
          ];
          colorArr[0].backgroundColor.push("#00b050"); 
          colorArr[0].backgroundColor.push("#ff1d1d");
          let json = {
            ques : ques,
            labelArr : labelArr,
            dataArr : dataArr,
            colorArr : colorArr
          }
          this.trQuesGraphArr.push(json);
        }
        
      },
      (error)=>{
        this.toastr.warning(Constant.returnServerErrorMessage("generateGraph14"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      }
    )
  }
  
  public downloadGraphReport(graphType : any){
    let period = "";
    let incidentCategory = "";
    let quarter = "";
    let siteType = "";
    let metroSiteType = "";
    let trainingName = "";
    if(graphType == 1){
      period = this.monthYear1;
      incidentCategory = this.incidentCategory1;
    }
    else if(graphType == 2){
      quarter = this.quarter5;
    }
    else if(graphType == 3){
      period = this.monthYear3;
    }
    else if(graphType == 4){
      quarter = this.quarter;
    }
    else if(graphType == 5){
      quarter = this.quarter1;
      siteType = this.replaceAll(this.siteType,"+","plus");
    } 
    else if(graphType == 6){
      quarter = this.quarter4;
      metroSiteType = this.metroSiteType;
    }
    else if(graphType == 7){
      quarter = this.quarter3;
    }
    else if(graphType == 8){
      quarter = this.quarter2;
    }
    else if(graphType == 9){
      quarter = this.quarter6;
    }
    else if(graphType == 10){
      trainingName = this.replaceAll(this.trainingName,"&","nnn");
    }
    else if(graphType == 11){
      quarter = this.quarter7;
    }
    else if(graphType == 13){
      let sql = "SELECT siteId as `Site Id`, status as `Status` ";
      sql += 'INTO XLSXML("Airport_Metro_Report.xls",{headers:true}) FROM ?';
      alasql(sql,[this.tableData]);
      return;
    }
    else if(graphType == 14){
      let sql = "SELECT question as `Question`, correctPercentage as `Correct %`, inCorrectPercentage as `Incorrect %` ";
      sql += 'INTO XLSXML("Question_Report.xls",{headers:true}) FROM ?';
      alasql(sql,[this.quesPercentageArr]);
      return;
    }
    var time = new Date();
    let millisecond = Math.round(time.getTime()/1000);
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      period : period,
      incidentCategory : incidentCategory,
      financialYear : this.financialYear,
      quarter : quarter,
      siteType : siteType,
      metroSiteType : metroSiteType,
      trainingName : trainingName,
      graphType : graphType,
      millisecond : millisecond
    }
    window.open(Constant.phpServiceURL+'downloadGraphReport.php?jsonData='+JSON.stringify(jsonData));
  }

  public selectFinancialYear(){
    let fny = this.financialYear.split(" - ");
    let fnyStart = fny[0];
    let fnyEnd = fny[1];
    this.monthList  = [
      {"paramCode" : "Apr-"+fnyStart,"paramDesc":"Apr-"+fnyStart},
      {"paramCode" : "May-"+fnyStart,"paramDesc":"May-"+fnyStart},
      {"paramCode" : "Jun-"+fnyStart,"paramDesc":"Jun-"+fnyStart},
      {"paramCode" : "Jul-"+fnyStart,"paramDesc":"Jul-"+fnyStart},
      {"paramCode" : "Aug-"+fnyStart,"paramDesc":"Aug-"+fnyStart},
      {"paramCode" : "Sep-"+fnyStart,"paramDesc":"Sep-"+fnyStart},
      {"paramCode" : "Oct-"+fnyStart,"paramDesc":"Oct-"+fnyStart},
      {"paramCode" : "Nov-"+fnyStart,"paramDesc":"Nov-"+fnyStart},
      {"paramCode" : "Dec-"+fnyStart,"paramDesc":"Dec-"+fnyStart},
      {"paramCode" : "Jan-"+fnyEnd,"paramDesc":"Jan-"+fnyEnd},
      {"paramCode" : "Feb-"+fnyEnd,"paramDesc":"Feb-"+fnyEnd},
      {"paramCode" : "Mar-"+fnyEnd,"paramDesc":"Mar-"+fnyEnd}
    ];
    let my = this.monthYear1;
    let mySplit = my.split("-");
    let m = mySplit[0];
    if(m == "Jan" || m == "Feb" || m == "Mar"){
      this.monthYear1 = m+"-"+fnyEnd;
    }
    else{
      this.monthYear1 = m+"-"+fnyStart;
    }
    this.generateInciGraphMonthWise(this.monthYear1);
    this.generateInciGraphQuarterWise(this.quarter5);
    this.generateAllPMGraph(this.quarter);
  }

  public replaceAll(str, find, replace){
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  public chartClicked(e: any, graphType : any): void {
    // console.log(e);
    this.downloadGraphReport(graphType);
  }

}
