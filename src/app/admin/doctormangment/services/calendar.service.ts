import {
  Injectable
} from '@angular/core';
import {
  Calendar
} from '../../../shared/interfaces/calendar.model';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import {
  throwError
} from 'rxjs';
import {
  catchError
} from 'rxjs/operators';
import {
  environment
} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly API_URL = 'assets/data/calendar.json';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  dataChange: BehaviorSubject < Calendar[] > = new BehaviorSubject < Calendar[] > (
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Calendar[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllCalendars(): Observable < Calendar[] > {
    return this.httpClient.get < Calendar[] > (this.API_URL)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addUpdateCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }
  deleteCalendar(calendar: Calendar): void {
    this.dialogData = calendar;
  }
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  AddCalendar(FormData) {
    return this.httpClient.post < any > (environment.apiUrl + 'schedule/docotrslotnew/', {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  GetAllSlots() {
    return this.httpClient.get < Calendar[] > (environment.apiUrl + 'schedule/doctorslots/')
      .pipe(map(Data => {
        return Data;
      }));
  }

  GetAllSlotsDoctor(ID: any) {
    return this.httpClient.get < Calendar[] > (environment.apiUrl + 'schedule/doctorslotsdcotor/' + ID)
      .pipe(map(Data => {
        return Data;
      }));
  }

  CheckSlot(Date, DoctorId) {
    return this.httpClient.post < boolean > (environment.apiUrl + 'schedule/checkslot/', {
        Date,
        DoctorId
      })
      .pipe(map(Data => {
        return Data;
      }));
  }

  CheckSlotAdmin(Date) {
    return this.httpClient.post < boolean > (environment.apiUrl + 'schedule/checkslotadmin/', {
      Date
    })
    .pipe(map(Data => {
      console.log(Data);
      return Data;
    }));
  }

  GetSlotDetails(AvailablityId: any) {
    return this.httpClient.get < Calendar > (environment.apiUrl + 'schedule/calendarslotdetails/' + AvailablityId)
      .pipe(map(Data => {
        return Data;
      }));
  }

  DeleteAvailability(AvailablityId: any) {
    return this.httpClient.get < boolean > (environment.apiUrl + 'schedule/deleteslotdetails/' + AvailablityId)
      .pipe(map(Data => {
        return Data;
      }));
  }

  UpdateNote(FormData){
    return this.httpClient.post < boolean > (environment.apiUrl + 'schedule/updatenote/', FormData)
    .pipe(map(Data => {
      return Data;
    }));
  }

  RemoveLink(Id, OnCallId){
    return this.httpClient.post < boolean > (environment.apiUrl + 'schedule/removelink/', {Id, OnCallId})
    .pipe(map(Data => {
      return Data;
    }));
  }

  GetOnCallSlots(Date, DoctorId){
    return this.httpClient.post < Calendar[] > (environment.apiUrl + 'schedule/oncallcheck/', {
      Date,
      DoctorId
    })
    .pipe(map(Data => {
      return Data;
    }));
  }

  UpdateLinkedCalledDays(FormData, Id){
    return this.httpClient.post < boolean > (environment.apiUrl + 'schedule/updatelinked/', {
      FormData,
      Id
    })
    .pipe(map(Data => {
      return Data;
    }));
  }
}
