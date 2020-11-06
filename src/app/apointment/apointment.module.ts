import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddnewComponent } from './component/addnew/addnew.component';
import { CustomFormsModule } from 'ng2-validation';
import {WebcamModule} from 'ngx-webcam';
import { CameraComponent } from './component/camera/camera.component';
import { AppointmentsListComponent } from './component/appointments-list/appointments-list.component';
import { AppointmentsListDoctorComponent } from './component/appointments-list-doctor/appointments-list-doctor.component';


import { AppointmentslistReffererComponent } from './component/appointmentslist-refferer/appointmentslist-refferer.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppointmentDetailsComponent } from './component/appointment-details/appointment-details.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EditDetailsComponent } from './component/edit-details/edit-details.component';
import { CancelDetailsComponent } from './component/cancel-details/cancel-details.component';

const routes: Routes = [
  {
    path: 'add-new',
    component: AddnewComponent,
    runGuardsAndResolvers: 'always'
  },
  // {
  //   path: 'add-new/:DoctorId',
  //   component: AddnewComponent,
  // },
   {
    path: 'details/:AptId',
    component: AppointmentDetailsComponent,
  },
  {
    path: 'list-all',
    component: AppointmentsListComponent,
  },
  {
    path: 'doctor',
    component: AppointmentsListDoctorComponent,
  },{
    path: 'refferer',
    component: AppointmentslistReffererComponent,
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

@NgModule({
  declarations: [AddnewComponent, CameraComponent, AppointmentsListComponent, AppointmentsListDoctorComponent, AppointmentslistReffererComponent, AppointmentDetailsComponent, EditDetailsComponent, CancelDetailsComponent],
  imports: [
    NgxMaskModule.forRoot(),
    ArchwizardModule,
    WebcamModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatSidenavModule,
    MatRadioModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ApointmentModule {}
