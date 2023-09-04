export class RoleTableSetting{
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
          editButtonContent: '<button>Edit</button>',
          mode: 'external'
        },
        delete: {
          deleteButtonContent: '<button>Delete</button>',
          mode: 'external'
        },
        pager :{
          perPage : 10
        },
        columns: {
          roleId: {
            title: 'Role Id',
            // sort : false,
            width : '70px'
          },
          roleName: {
            title: 'Role',
            // sort : false,
          },
          menuId: {
            title: 'Menu',
          }
          // verifierRole: {
          //   title: 'Verifier Role',
          // },
          // approverRole: {
          //   title: 'Approver Role',
          // }
        }
    }
}