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
  ReffererAddResponse,
  Refferer,
  ReffererList
} from '../../../shared/interfaces/refferer.interface';

@Injectable({
  providedIn: 'root'
})
export class RefferService {




  constructor(private httpClient: HttpClient) {}

  AddNewRefferer(FormData) {

    return this.httpClient.post < ReffererAddResponse > (environment.apiUrl + 'user_api/addrefferer/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  UpdateRefferer(FormData, ReffereId) {

    return this.httpClient.post < ReffererAddResponse > (environment.apiUrl + 'user_api/updaterefferer/', {
      FormData,
      ReffereId
    }).pipe(map(Data => {
      return Data;
    }));
  }


  dataChange: BehaviorSubject < Refferer[] > = new BehaviorSubject < Refferer[] > ([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): Refferer[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllRefferer(sort: string, order: string, page: number, size: number, query: string): Observable < ReffererList > {

    const params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('size', size.toString())
      .set('page', page.toString())
      .set('query', query.toString());
    return this.httpClient.get < ReffererList > (environment.apiUrl + 'user_api/getalldocotrs', {
      params
    });
  }


  getAllReffererList() {

    return this.httpClient.get < Refferer[] > (environment.apiUrl + 'user_api/getallreffererlist/')
      .pipe(map(Data => {
        return Data;
      }));
  }

  deleteRefferer(id: number) {

    return this.httpClient.get < boolean > (environment.apiUrl + 'user_api/deleterefferer/' + id)
      .pipe(map(Data => {
        return Data;
      }));
  }

  geReffererDetails(id: string) {
    return this.httpClient.post < Refferer > (environment.apiUrl + 'user_api/reffereprofile/', {
        id
      })
      .pipe(map(Data => {
        return Data;
      }));
  }

  getRefferDefaultPassword() {
    return this.httpClient.get < string > (environment.apiUrl + 'user_api/refferepassword/')
      .pipe(map(Data => {
        return Data;
      }));
  }

  UpdatePassword(Password) {
    return this.httpClient.post < boolean > (environment.apiUrl + 'user_api/updatepasswordrefferer/', {
      Password
      })
      .pipe(map(Data => {
        return Data;
      }));
  }
}
