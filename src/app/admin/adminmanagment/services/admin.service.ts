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
  AdminAddResponse,
  Admin,
  AdminList
} from '../../../shared/interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {




  constructor(private httpClient: HttpClient) {}

  AddNewAdmin(FormData) {

    return this.httpClient.post < AdminAddResponse > (environment.apiUrl + 'user_api/addadmin/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  UpdateAdmin(FormData,AdminId) {

    return this.httpClient.post < AdminAddResponse > (environment.apiUrl + 'user_api/updateadmin/', {
      FormData,
      AdminId
    }).pipe(map(Data => {
      return Data;
    }));
  }


  dataChange: BehaviorSubject < Admin[] > = new BehaviorSubject < Admin[] > ([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): Admin[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllDoctorss(sort: string, order: string, page: number, size: number, query: string): Observable < AdminList > {

    const params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('size', size.toString())
      .set('page', page.toString())
      .set('query', query.toString());
    return this.httpClient.get < AdminList > (environment.apiUrl + 'user_api/getalladmin', {
      params
    });
  }

  deleteAdmin(id: number) {
    console.log(id);
    return this.httpClient.get < boolean > (environment.apiUrl + 'user_api/deleteadmin/' + id)
      .pipe(map(Data => {
        return Data;
      }));
  }

  getAdminDetails(id: string){
    return this.httpClient.post < Admin > (environment.apiUrl + 'user_api/adminprofile/', {
      id
    })
    .pipe(map(Data => {
      return Data;
    }));
  }
}
