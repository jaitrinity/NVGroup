export class RaiserTableSetting{
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
          name: {
            title: 'Name'
          },
          mobile: {
            title: 'Mobile',
            // sort : false,
          },
          whatsapp: {
            title: 'Whatsapp',
            // sort : false,
          },
          aadharCard: {
            title: 'Aadhar Card',
            // sort : false,
          }
        }
    }
}