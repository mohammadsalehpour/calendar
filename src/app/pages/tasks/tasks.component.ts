import { Component, Injector } from '@angular/core';
import 'devextreme/data/odata/store';
import { AppComponentBase } from 'src/app/shared/entities/app-component-base';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent extends AppComponentBase {
  dataSource: any;
  priority: any[];

  constructor(injector: Injector) {
    super(injector);
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
  }
}
