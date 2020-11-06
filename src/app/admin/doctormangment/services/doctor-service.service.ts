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
  DoctorAddResponse,
  Doctor,
  DoctorList,
  DoctorUrlResponse
} from '../../../shared/interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {




  constructor(private httpClient: HttpClient) {}

  AddNewDoctor(FormData) {

    return this.httpClient.post < DoctorAddResponse > (environment.apiUrl + 'user_api/adddoctor/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  UpdateDoctor(FormData, DoctorId) {

    return this.httpClient.post < DoctorAddResponse > (environment.apiUrl + 'user_api/updatedoctor/', {
      FormData,
      DoctorId
    }).pipe(map(Data => {
      return Data;
    }));
  }


  dataChange: BehaviorSubject < Doctor[] > = new BehaviorSubject < Doctor[] > ([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): Doctor[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllDoctorss(sort: string, order: string, page: number, size: number, query: string): Observable < DoctorList > {

    const params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('size', size.toString())
      .set('page', page.toString())
      .set('query', query.toString());
    return this.httpClient.get < DoctorList > (environment.apiUrl + 'user_api/getalldocotrs', {
      params
    });
  }

  getAllDoctorsListAssign(Id: any) {

    return this.httpClient.get < Doctor[] > (environment.apiUrl + 'user_api/getalldoctorlistassing/' + Id)
      .pipe(map(Data => {
        return Data;
      }));
  }

  getAllDoctorsList() {
    return this.httpClient.get < Doctor[] > (environment.apiUrl + 'user_api/getalldoctorlist/')
      .pipe(map(Data => {
        return Data;
      }));
  }

  getAllDoctorsListOnCall(Date: string){
    return this.httpClient.post < Doctor[] > (environment.apiUrl + 'user_api/getalldoctorlistonduty/', {Date})
    .pipe(map(Data => {
      return Data;
    }));
  }

  deleteDoctors(id: number) {
    console.log(id);
    return this.httpClient.get < boolean > (environment.apiUrl + 'user_api/deletedoctor/' + id)
      .pipe(map(Data => {
        return Data;
      }));
  }

  getDoctorDetails(id: string) {
    return this.httpClient.post < Doctor > (environment.apiUrl + 'user_api/docotrprofile/', {
        id
      })
      .pipe(map(Data => {
        return Data;
      }));
  }

  UpdateDoctorAppointmentStatus(DoctorId, FormData ){
    return this.httpClient.post < boolean > (environment.apiUrl + 'user_api/updatedoctorstatus/', {
      FormData,
      DoctorId
    }).pipe(map(Data => {
      return Data;
    }));
  }

  GetDocotrDetailByUrl(url: string) {
    return this.httpClient.post < DoctorUrlResponse > (environment.apiUrl + 'user_api/docotrprofileurl/', {
        url
      })
      .pipe(map(Data => {
        return Data;
      }));
  }

  GetDoctorDetailsOnCall() {
    return this.httpClient.get < DoctorUrlResponse > (environment.apiUrl + 'user_api/doctoroncall/')
      .pipe(map(Data => {
        return Data;
      }));
  }
}
