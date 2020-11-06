import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  NgxDatatableModule
} from '@swimlane/ngx-datatable';
import {
  MatTableModule
} from '@angular/material/table';
import {
  MatPaginatorModule
} from '@angular/material/paginator';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatDialogModule
} from '@angular/material/dialog';
import {
  MatSortModule
} from '@angular/material/sort';
import {
  MatToolbarModule
} from '@angular/material/toolbar';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatCheckboxModule
} from '@angular/material/checkbox';
import {
  MaterialFileInputModule
} from 'ngx-material-file-input';
import {
  FullCalendarModule
} from '@fullcalendar/angular';

import {
  Routes,
  RouterModule
} from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {
  UploadFileService
} from '../../shared/services/upload-file.service';
import {
  CustomFormsModule
} from 'ng2-validation';

import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { DoctorScheduleFromProcessComponent } from './components/doctor-schedule-from-process/doctor-schedule-from-process.component';
import { DoctorScheduleChartComponent } from './components/doctor-schedule-chart/doctor-schedule-chart.component';
import { DoctorScheduleDetailsComponent } from './components/doctor-schedule-details/doctor-schedule-details.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



const routes: Routes = [
{
  path: '',
  component: DoctorScheduleChartComponent,
}
];

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';


@NgModule({
  declarations: [DoctorScheduleFromProcessComponent, DoctorScheduleChartComponent, DoctorScheduleDetailsComponent],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CustomFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: MY_DATE_FORMATS}
  ]
})
export class DoctorScheduleModule {}
