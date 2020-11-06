import { Injectable } from '@angular/core';
import { DoctorDashboard } from '../../shared/interfaces/dashboard.interface';
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
export class ServiceService {

  constructor(public httpClient: HttpClient) { }


  DoctorDashbaord(DoctorId) {

    return this.httpClient.post < DoctorDashboard > (environment.apiUrl + 'user_api/doctordashboard/' +  DoctorId, {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }

  AdminDashbaord() {

    return this.httpClient.post < DoctorDashboard > (environment.apiUrl + 'user_api/admindashboard/' , {
      FormData
    }).pipe(map(Data => {
      return Data;
    }));
  }
}
