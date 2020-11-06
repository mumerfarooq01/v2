import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  AdminService
} from '../../services/admin.service';
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
  Admin,
  AdminList
} from '../../../../shared/interfaces/admin.interface';
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
  AuthService
} from '../../../../shared/security/auth.service';
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
  selector: 'app-list-all-admin',
  templateUrl: './list-all-admin.component.html',
  styleUrls: ['./list-all-admin.component.sass']
})
export class ListAllAdminComponent implements AfterViewInit {
  displayedColumns = [

    'profilepic',
    'Name',
    'email',
    'mobile',
    'msp',
    'actions'
  ];
  exampleDatabase: ExampleHttpDatabase | null;
  data: Admin[] = [];
  index: number;
  id: number;
  Editid: string;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  CurrentUser: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter', {
    static: true
  }) filter: ElementRef;

  constructor(private _httpClient: HttpClient, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private _AuthService: AuthService) {

  }

  ngAfterViewInit() {

    this.CurrentUser = this._AuthService.LoggedInUserId();
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter.nativeElement.value);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.List;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  applyFilter(event: Event) {
    this.ngAfterViewInit();
  }
  RefreshData() {
    this.filter.nativeElement.value = '';
    this.ngAfterViewInit();
  }

  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {

        this.ngAfterViewInit();
      }
    });
  }
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  _filterChange = new BehaviorSubject('');



  getRepoIssues(sort: string, order: string, page: number, size: number, query: string): Observable < AdminList > {

    const params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('size', size.toString())
      .set('page', page.toString())
      .set('query', query.toString());
    return this._httpClient.get < AdminList > (environment.apiUrl + 'user_api/getalladmin', {
      params
    });
  }
}
