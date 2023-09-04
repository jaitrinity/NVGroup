export class LocationTableSetting{
    public static setting = {
        mode: 'external',
        //hideHeader : true,
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'editrecord', title: 'Edit'},
            { name: 'deactiveLocation', title: 'Deactive'},
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          locId: {
            title: 'Loc Id',
            width : '80px'
          },
          state:{
            title : 'State',
            width : '80px'
          },
          locName: {
            title: 'Site name',
            width : '120px'
            // sort : false,
          },
         
          // geoCoordinate: {
          //   title: 'Lat-long',
          //   sort : false,
          // },
          
        }
    }
}