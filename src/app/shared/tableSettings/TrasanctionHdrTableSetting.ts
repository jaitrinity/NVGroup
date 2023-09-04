export class TrasanctionHdrTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : true
        },
        pager :{
          perPage : 10
        },
        columns: {
          // transactionId: {
          //   // title: 'TRANSACTION_ID',
          //   title: 'Activity Id',
          //   width : '85px'
          //   // sort : false,
          // },
          // fillingBy : {
          //   title: 'Employee Name',
          //   width : '138px'
          // },
          // topFirstCheckpointValue : {
          //   title: 'Site Name',
          //   width : '138px'
          // },
          // dateTime: {
          //   title: 'Date',
          //   width : '138px'
          //   // sort : false,
          // },
          // // locationName : {
          // //   title: 'Site Name',
          // //   width : '138px'
          // // },
          
          // // ticketType : {
          // //   title: 'Ticket Type',
          // //   width : '138px'
          // // },
          // okCount : {
          //   title : 'Ok',
          //   width : '50px'
          // },
          // notOkCount :{
          //   title : 'Not Ok',
          //   width : '50px'
          // },
          // // verifiedDate: {
          // //   title: 'Verify Date',
          // //   width : '138px'
          // //   // sort : false,
          // // },
          // // verifiedBy: {
          // //   title: 'Verify By',
          // //   width : '200px'
          // //   // sort : false,
          // // },
          // // approvedDate : {
          // //   title : "Approve Date",
          // //   width : '138px'
          // //   // sort : false,
          // // },
          // // approvedBy : {
          // //   title : "Approve By",
          // //   width : '200px'
          // //   // sort : false,
          // // },
          // pendingForVerify : {
          //   title : "Verfied",
          //   width : '50px'
          //   // sort : false,
          // },
          // pendingForApprove : {
          //   title : "Approved",
          //   width : '50px'
          //   // sort : false,
          // }
        },
        delete: {
          deleteButtonContent: '<button>View</button>',
          mode: 'external'
        }
    }
}