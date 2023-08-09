import { Component } from '@angular/core';
import { ServicesService } from './services.service';
import { Data, Info } from './interfaces/workflow.interface';

declare var workflowCockpit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fluxo-padrao';

  constructor(private service: ServicesService) {
    new workflowCockpit({
      init: this._loadData,
      onSubmit: this._saveData,
      onError: this._rollback,
    });
  }

  private _saveData = (_data: Data, _info: Info): any => {};
  private _loadData = async (_data: Data, info: Info): Promise<void> => {
    console.log(_data);
  };
  private _rollback = (_data: Data, _info: Info): any => {};
}
