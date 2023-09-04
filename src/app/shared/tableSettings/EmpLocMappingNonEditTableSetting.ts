export class EmpLocMappingNonEditTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false
        },
        pager :{
          perPage : 10
        },
        columns: {
          state:{
            title : 'State'
          },
          
          locName: {
            title: 'Site name',
          },
          siteType :{
            title : 'Site Type'
          },
          empName :{
            title : 'Employee Name',
          },
          // roleName :{
          //   title : 'Role',
          // },
         
        }
    }
}