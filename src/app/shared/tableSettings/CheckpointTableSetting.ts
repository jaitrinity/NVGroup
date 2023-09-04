export class CheckpointTableSetting{
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
          checkpointId: {
            title: 'Chk Id',
            // sort : false,
            width : '70px'
          },
          description: {
            title: 'Description',
            // sort : false,
            width : '300px'
          },
          value: {
            title: 'Value',
            // sort : false,
            type: 'html',
            width : '300px',
            valuePrepareFunction : (cell, row) =>{
              if(row.typeId == "12" || row.typeId == "16" || row.typeId == "18" || row.typeId == "19"){
                return `<a href="${row.value}" target='blank'><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
              }
              // else if(row.typeId == "19" ){
              //   return `<img src="${row.value}" class="icon" />`;
              // }
              else{
                return row.value;
              }
            }
          },
          typeName: {
            title: 'Type',
            // sort : false,
            width : '100px'
          },
          mandatory: {
            title: 'Mandatory',
            // sort : false,
            width : '100px'
          },
          editable: {
            title: 'Editable',
            // sort : false,
            width : '100px'
          },
          correct: {
            title: 'Correct',
            // sort : false,
            width : '100px'
          },
          size: {
            title: 'Size ?',
            sort : false,
            class : "info checkpoint_size",
            width : "70px"
          },
          score: {
            title: 'Score',
            // sort : false,
            width : "60px"
          },
          language: {
            title: 'Language',
            // sort : false,
            width : '100px'
          },
          dependent: {
            title: 'Dependent',
            // sort : false,
            width : '100px'
          },
          logic: {
            title: 'Logic ?',
            sort : false,
            class : "info checkpoint_logic"
          },
          // active: {
          //   title: 'Active'
          // }
        }
    }
}