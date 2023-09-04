export class EmployeeTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'editrecord', title: 'Edit'},
            { name: 'activerecord', title: 'Activate' },
            { name: 'deactiverecord', title: 'Deactivate' },
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          
          // empName: {
          //   title: 'Emp name',
          //   // sort : false,
          // },
          // mobile: {
          //   title: 'Mobile',
          //   // sort : false,
          // },
          // emailId: {
          //   title: 'E-mail',
          //   // sort : false,
          // },
          // roleName: {
          //   title: 'Role',
          //   // sort : false,
          // },
          
          // state: {
          //   title: 'State',
          //   // sort : false,
          // },
          // rmName: {
          //   title: 'RM Employee',
          //   // sort : false,
          // },
          
          // active: {
          //   title: 'Active',
          //   // sort : false,
          //   width : "80px"
          // }
        }
    }
}