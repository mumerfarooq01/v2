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
  selector: 'app-appointments-list-doctor',
  templateUrl: './appointments-list-doctor.component.html',
  styleUrls: ['./appointments-list-doctor.component.sass']
})
export class AppointmentsListDoctorComponent  implements AfterViewInit  {
  displayedColumns = [
    'patient_name',
    'ReffererName',
    'slot_start',
    'status',
    'actions'
  ];

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
  @ViewChild('filterAck', {
    static: true
  }) filterAck: ElementRef;



  constructor(private _httpClient: HttpClient, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {

  }

  ngAfterViewInit() {

    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter.nativeElement.value, this.filtercancel.nativeElement.checked, this.filterconfirm.nativeElement.checked, this.filterpending.nativeElement.checked,this.filterAck.nativeElement.checked);
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
    this.filterpending.nativeElement.checked = false;
    this.filterconfirm.nativeElement.checked = false;
    this.filtercancel.nativeElement.checked = false;
    this.filterAck.nativeElement.checked = false;
    this.ngAfterViewInit();
  }


}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private httpClient: HttpClient) {}

  _filterChange = new BehaviorSubject('');



  getRepoIssues(sort: string, order: string, page: number, size: number, query: string, cancel: string, confirm: string, pending: string, Ack: string): Observable < AppointmentList > {

    const params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('size', size.toString())
      .set('page', page.toString())
      .set('date', query.toString())
      .set('cancel', cancel.toString())
      .set('confirm', confirm.toString())
      .set('pending', pending.toString())
      .set('acknowledge', Ack.toString());
    return this.httpClient.get < AppointmentList > (environment.apiUrl + 'appointment/getall', {
      params
    });
  }
}
