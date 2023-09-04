export class DeviceTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : true,
          delete : true,
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
          empId: {
            title: 'Emp Id',
            // sort : false,
          },
          mobile: {
            title: 'Mobile',
            // sort : false,
          },
          name: {
            title: 'Name',
            // sort : false,
          },
          make: {
            title: 'Make',
            // sort : false,
            width : "112px",
          },
          model: {
            title: 'Model',
            // sort : false,
            width : "125px",
          },
          os: {
            title: 'OS',
            // sort : false,
            width : "75px",
          },
          appVer: {
            title: 'App Version',
            // sort : false,
          },
          active: {
            title: 'Active',
            // sort : false,
            width : "75px",
          },
          registeredOn: {
            title: 'Register on',
            // sort : false,
          }
        }
    }
}