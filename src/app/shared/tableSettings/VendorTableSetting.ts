export class VendorTableSetting{
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
            // { name: 'activerecord', title: 'Activate' },
            // { name: 'deactiverecord', title: 'Deactivate' },
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          vendorCode: {
            title: 'Code'
          },
          vendorName: {
            title: 'Name',
            // sort : false,
          },
          vendorType: {
            title: 'Type',
            // sort : false,
          },
          vendorState: {
            title: 'State',
            // sort : false,
          },
          vendorMobile: {
            title: 'Mobile',
            // sort : false,
          }
        }
    }
}