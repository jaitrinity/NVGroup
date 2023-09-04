export class EmpLocMappingTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'editEmpLocRecord', title: 'Edit'}
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          state:{
            title : 'State'
          },
          // city:{
          //   title : 'City'
          // },
          // area:{
          //   title : 'Area'
          // },
          locName: {
            title: 'Site name',
          },
          siteId: {
            title: 'Site Id',
          },
          empName :{
            title : 'Employee Name',
          },
          roleName :{
            title : 'Role',
          },
          // geoCoordinate: {
          //   title: 'Geo-coordingate'
          // }
        }
    }
}