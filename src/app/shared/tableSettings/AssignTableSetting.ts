export class AssignTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : true,
          delete : true
        },
        edit: {
          editButtonContent: '<button>Activate</button>',
          mode: 'external'
        },
        delete: {
          deleteButtonContent: '<button>Deactivate</button>',
          mode: 'external'
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
          locId: {
            title: 'Location ?',
            sort : false,
            class : "info assign_location"
          },
          startDate: {
            title: 'Start Date',
            // sort : false,
          },
          endDate: {
            title: 'End Date',
            // sort : false,
          },
          active: {
            title: 'Active',
            // sort : false,
            width : '70px'
          }
        }
    }
}