import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';

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
  Appointment,
  AppointmentList
} from '../../../shared/interfaces/appointment.interface';
import {
  Doctor,
  DoctorList
} from '../../../shared/interfaces/doctor.interface';
import {
  Refferer
} from '../../../shared/interfaces/refferer.interface';
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
  DoctorServiceService
} from '../../../admin/doctormangment/services/doctor-service.service';
import {
  RefferService
} from '../../../admin/refferermanagment/services/reffer.service';
import {
  environment
} from '../../../../environments/environment';
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

// import {
//   DeleteDialogComponent
// } from '../dialogs/delete/delete.component';
import {
  SelectionModel
} from '@angular/cdk/collections';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.sass']
})
export class AppointmentsListComponent implements AfterViewInit {
  displayedColumns = [

    'patient_name',
    'DoctorName',
    'ReffererName',
    'slot_start',
    'status',
    'actions'
  ];

  ReffererList: Refferer[] = [];
  DoctorList: Doctor[] = [];
  DoctorId: string;
  ReffererId: string;
  FilterAll: string;
  FilterSearch: string;
  FilterSearchP: string;
  FilterSearchC: string;
  FilterSearchCa: string;
  FilterSearchAk: string;
  exampleDatabase: ExampleHttpDatabase | null;
  data: Appointment[] = [];
  index: number;
  id: number;
  Editid: string;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter', {
    static: true
  }) filter: ElementRef;
  @ViewChild('filterpending', {
    static: true
  }) filterpending: ElementRef;
  @ViewChild('filterconfirm', {
    static: true
  }) filterconfirm: ElementRef;
  @ViewChild('filtercancel', {
    static: true
  }) filtercancel: ElementRef;
  @ViewChild('filterall', {
    static: true
  }) filterall: ElementRef;
  @ViewChild('DoctorSelect', {
    static: true
  }) DoctorSelect: ElementRef;
  @ViewChild('RefSelect', {
    static: true
  }) RefSelect: ElementRef;
  @ViewChild('filterAck', {
    static: true
  }) filterAck: ElementRef;



  constructor(private httpClient: HttpClient, private reffererservice: RefferService, private doctorservice: DoctorServiceService, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {

    this.doctorservice.getAllDoctorsList()
      .subscribe(
        Data => {
          this.DoctorList = Data;
        }
      );

    this.reffererservice.getAllReffererList()
      .subscribe(
        Data => {
          this.ReffererList = Data;
          console.log(this.ReffererList);
        }
      );

  }

  ngAfterViewInit() {

    this.exampleDatabase = new ExampleHttpDatabase(this.httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter.nativeElement.value, this.filtercancel.nativeElement.checked, this.filterconfirm.nativeElement.checked, this.filterpending.nativeElement.checked,this.filterAck.nativeElement.checked, this.DoctorSelect.nativeElement.value, this.RefSelect.nativeElement.value);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.List.map((item) => {
            item.slot_start = item.slot_start.replace(/\s/g, "T") + 'Z';
            return item;
          })
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  applyFilterCheck(event: Event, stringCheck) {

    if (stringCheck === 'pending') {
      this.filterall.nativeElement.checked = false;
      this.filterconfirm.nativeElement.checked = false;
      this.filtercancel.nativeElement.checked = false;
      this.filterAck.nativeElement.checked = false;
    } else if (stringCheck === 'confirm') {
      this.filterpending.nativeElement.checked = false;
      this.filterall.nativeElement.checked = false;
      this.filterAck.nativeElement.checked = false;
      this.filtercancel.nativeElement.checked = false;
    } else if (stringCheck === 'cancel') {
      this.filterpending.nativeElement.checked = false;
      this.filterconfirm.nativeElement.checked = false;
      this.filterall.nativeElement.checked = false;
      this.filterAck.nativeElement.checked = false;
    } else if (stringCheck === 'ack') {
      this.filterpending.nativeElement.checked = false;
      this.filterconfirm.nativeElement.checked = false;
      this.filterall.nativeElement.checked = false;
      this.filtercancel.nativeElement.checked = false;
    } else {
      this.filterpending.nativeElement.checked = false;
      this.filterconfirm.nativeElement.checked = false;
      this.filtercancel.nativeElement.checked = false;
      this.filterall.nativeElement.checked = true;
      this.filterAck.nativeElement.checked = false;
    }
    this.ngAfterViewInit();
  }

  applyFilter(event) {


    this.ngAfterViewInit();
  }
  RefreshData() {
    this.filter.nativeElement.value = '';
    this.DoctorSelect.nativeElement.value = '';
    this.RefSelect.nativeElement.value = '';
    this.filterpending.nativeElement.checked = false;
    this.filterconfirm.nativeElement.checked = false;
    this.filtercancel.nativeElement.checked = false;
    this.filterAck.nativeElement.checked = false;
    this.ngAfterViewInit();
  }


  ExportDataExcel(){

    var form = document.createElement("form");

    form.method = "POST";
    form.target = "_blank";
    form.action = environment.apiUrl + 'Export';


    var date = document.createElement("input");
    date.type = "hidden";
    date.value = this.filter.nativeElement.value;
    date.name = 'date';
    form.appendChild(date);

    var type = document.createElement("input");
    type.type = "hidden";
    type.value = 'all';
    type.name = 'type';
    form.appendChild(type);

    var cancel = document.createElement("input");
    cancel.type = "hidden";
    cancel.value = this.filtercancel.nativeElement.checked;
    cancel.name = 'cancel';
    form.appendChild(cancel);

    var confirm = document.createElement("input");
    confirm.type = "hidden";
    confirm.value = this.filterconfirm.nativeElement.checked;
    confirm.name = 'confirm';
    form.appendChild(confirm);

    var pending = document.createElement("input");
    pending.type = "hidden";
    pending.value = this.filterpending.nativeElement.checked;
    pending.name = 'pending';
    form.appendChild(pending);

    var doctor = document.createElement("input");
    doctor.type = "hidden";
    doctor.value = this.DoctorSelect.nativeElement.value;
    doctor.name = 'doctor';
    form.appendChild(doctor);

    var referrar = document.createElement("input");
    referrar.type = "hidden";
    referrar.value = this.RefSelect.nativeElement.value;
    referrar.name = 'referrar';
    form.appendChild(referrar);
    document.body.appendChild(form);

    form.submit();
  }

}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private httpClient: HttpClient) {}

  _filterChange = new BehaviorSubject('');



  getRepoIssues(sort: string, order: string, page: number, size: number, query: string, cancel: string, confirm: string, pending: string, Ack: string, doctor: string, referrar: string): Observable < AppointmentList > {

    const params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('size', size.toString())
      .set('page', page.toString())
      .set('date', query.toString())
      .set('cancel', cancel.toString())
      .set('confirm', confirm.toString())
      .set('pending', pending.toString())
      .set('doctor', doctor.toString())
      .set('acknowledge', Ack.toString())
      .set('referrar', referrar.toString());
    return this.httpClient.get < AppointmentList > (environment.apiUrl + 'appointment/getall', {
      params
    });
  }
}
