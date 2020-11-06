import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';

import {
  environment
} from '../../../../environments/environment';

import {
  Assitant,
  AssitantAddResponse,
  AssitantList
} from '../../../shared/interfaces/assitant.interface';

@Injectable({
  providedIn: 'root'
})
export class AssitantService {




  constructor(private httpClient: HttpClient) {}

  AddNewAssistant(FormData) {

    return this.httpClient.post < AssitantAddResponse > (environment.apiUrl + 'user_api/addassitant/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  UpdateAssistant(FormData,Assitantid) {

    return this.httpClient.post < AssitantAddResponse > (environment.apiUrl + 'user_api/updateassitant/', {
      FormData,
      Assitantid
    }).pipe(map(Data => {
      return Data;
    }));
  }


  dataChange: BehaviorSubject < Assitant[] > = new BehaviorSubject < Assitant[] > ([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): Assitant[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  deleteAssitant(id: number) {
    console.log(id);
    return this.httpClient.get < boolean > (environment.apiUrl + 'user_api/deleteassitant/' + id)
      .pipe(map(Data => {
        return Data;
      }));
  }

  getAssitDetails(id: string){
    return this.httpClient.post < Assitant > (environment.apiUrl + 'user_api/assitprofile/', {
      id
    })
    .pipe(map(Data => {
      return Data;
    }));
  }
}
