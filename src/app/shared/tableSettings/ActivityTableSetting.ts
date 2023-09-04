export class ActivityTableSetting{
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
          empName: {
            title: 'Emp name',
            // sort : false,
          },
          menuName: {
            title: 'Menu',
            // sort : false,
          },
          locName: {
            title: 'Location',
            // sort : false,
          },
          event: {
            title: 'Event',
            // sort : false,
          },
          dateTime: {
            title: 'Date Time',
            // sort : false,
          }
        }
    }
}