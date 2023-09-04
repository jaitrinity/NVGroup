export class MappingTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            // { name: 'editrecord', title: 'Edit'},
            // { name: 'activerecord', title: 'Activate' },
            // { name: 'deactiverecord', title: 'Deactivate' },
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          // empName: {
          //   title: 'Employee name',
          //   // sort : false,
          // },
          // locationName: {
          //   title: 'Site Name',
          //   sort : false,
          // },
          // startDate: {
          //   title: 'From Date',
          //   // sort : false,
          // },
          // endDate: {
          //   title: 'To Date',
          //   // sort : false,
          // },
          
          // // active: {
          // //   title: 'Active',
          // //   // sort : false,
          // // },
          // tktStatus : {
          //   title : 'Tkt Status'
          // }
          
        }
    }
}