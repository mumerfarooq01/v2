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

import {
  Appointment,
  AppointmentResponse
} from '../../shared/interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class ApointmentServiceService {

  constructor(private httpClient: HttpClient) {}

  AddNewAppointment(FormData) {

    return this.httpClient.post < AppointmentResponse > (environment.apiUrl + 'appointment/addnew/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  UploadAppointmentCard(FormData , AptId) {

    return this.httpClient.post < boolean > (environment.apiUrl + 'appointment/uploadpatientcard/' + AptId, {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }


  UploadReportCards(FormData , AptId) {

    return this.httpClient.post < boolean > (environment.apiUrl + 'appointment/uploadpatientreports/' + AptId, {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  AppointmentDetails(ApptId) {

    return this.httpClient.get < AppointmentResponse > (environment.apiUrl + 'appointment/appointmentdetails/' + ApptId)
      .pipe(map(Data => {
        return Data;
      }));
  }

  UpdateAppointment(ApptId, FormData){
    return this.httpClient.post < boolean > (environment.apiUrl + 'appointment/updateappointment/' + ApptId, {FormData})
    .pipe(map(Data => {
      return Data;
    }));
  }

  CancelAppointment(ApptId, cancel_reason, status){
    
    return this.httpClient.post < boolean > (environment.apiUrl + 'appointment/cancelstatus/' + ApptId, {cancel_reason, status})
    .pipe(map(Data => {
      return Data;
    }));
  }

  ChangeStatus(status, ApptId) {
    return this.httpClient.post < boolean > (environment.apiUrl + 'appointment/changestatus/' + ApptId, {status})
      .pipe(map(Data => {
        return Data;
      }));
  }

}
