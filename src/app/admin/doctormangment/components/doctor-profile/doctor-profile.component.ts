

import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  DoctorServiceService
} from '../../services/doctor-service.service';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
  Doctor,
  DoctorList
} from '../../../../shared/interfaces/doctor.interface';
import {
  DataSource,
  CollectionViewer
} from '@angular/cdk/collections';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  fromEvent,
  merge,
  Observable,
  of as observableOf,

} from 'rxjs';

import {
  environment
} from '../../../../../environments/environment';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  map,
  startWith,
  switchMap,
  finalize,
  catchError
} from 'rxjs/operators';

import {
  DeleteDialogComponent
} from '../dialogs/delete/delete.component';
import {
  SelectionModel
} from '@angular/cdk/collections';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.sass']
})
export class DoctorProfileComponent implements OnInit {



  Doctor = {} as Doctor;
  index: number;




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter', {
    static: true
  }) filter: ElementRef;


  constructor(private _httpClient: HttpClient,public _doctorerservice:DoctorServiceService, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
  this._doctorerservice.getDoctorDetails( this.activatedRoute.snapshot.params.DoctorId).subscribe(
    Data => {

      this.Doctor = Data;

    }, Error => {}
  );
}
}
