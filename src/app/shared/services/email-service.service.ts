import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http: HttpClient) {}

  checkEmailNotTaken(email: string) {

    return this.http.post < any > (environment.apiUrl + 'user_api/emailcheck/', {
      email
    });
  }
  checkEmailNotTakenEdit(email: string, id: string) {
    return this.http.post < any > (environment.apiUrl + 'user_api/emailcheckedit/', {
      email,
      id
    });
  }

  checkMspNotTaken(msp: string) {

    return this.http.post < any > (environment.apiUrl + 'user_api/mpscheck/', {
      msp
    });
  }
  checkMspNotTakenEdit(msp: string, id: string) {
    return this.http.post < any > (environment.apiUrl + 'user_api/mspcheckedit/', {
      msp,
      id
    });
  }
}
