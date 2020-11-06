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
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(public httpClient: HttpClient) { }


  UpdatePassword(FormData) {

    return this.httpClient.post < boolean > (environment.apiUrl + 'user_api/changepassword/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }
}
