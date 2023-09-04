export class InputTypeTableSetting{
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
          typeId: {
            title: 'Type Id',
            // sort : false,
            width : '70px'
          },
          typeName: {
            title: 'Type',
            // sort : false,
          }
        }
    }
}