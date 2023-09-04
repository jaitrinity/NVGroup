export class LocationNonEditTableSetting{
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
            { name: 'deactiveLocation', title: 'Deactive'},
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          locId: {
            title: 'Location Id',
            width : '40px'
          },
          state:{
            title : 'State',
            // width : '80px'
          },
          
          locName: {
            title: 'Site name',
            // width : '120px'
          },
          
          siteType: {
            title: 'Site Type',
            // width : '100px'
          },
          active : {
            title : 'Active'
          }
          
        }
    }
}