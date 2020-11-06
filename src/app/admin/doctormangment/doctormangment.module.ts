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

import {
  UploadFileService
} from '../../shared/services/upload-file.service';
import {
  CustomFormsModule
} from 'ng2-validation';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
  ListAllComponent
} from './components/list-all/list-all.component';
import {
  AddNewComponent
} from './components/add-new/add-new.component';
import {
  DeleteDialogComponent
} from './components/dialogs/delete/delete.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { FormComponent } from './components/schedule/dialogue/form/form.component';
import { DialogueDetailsComponent } from './components/schedule/dialogue-details/dialogue-details.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const routes: Routes = [{
    path: '',
    redirectTo: 'list-all',
    pathMatch: 'full',
  },
  {
    path: 'list-all',
    component: ListAllComponent,
  },
  {
    path: 'add-new',
    component: AddNewComponent,
  },
  {
    path: 'edit/:EditId',
    component: AddNewComponent,
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
  },
  {
    path: 'profile/:DoctorId',
    component: DoctorProfileComponent
  }
];

@NgModule({
  declarations: [ListAllComponent, AddNewComponent, DeleteDialogComponent, ScheduleComponent, FormComponent, DialogueDetailsComponent, DoctorProfileComponent, ],
  imports: [
    NgxMaskModule.forRoot(),
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
})
export class DoctormangmentModule {}
