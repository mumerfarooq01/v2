import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MorrisJsModule } from 'angular-morris-js';
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
import { GeneratePasswordComponent } from './components/generate-password/generate-password.component';
import { CustomFormsModule } from 'ng2-validation';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const routes: Routes = [
  {
    path: 'reset-password',
    component: GeneratePasswordComponent,
  }
];

@NgModule({
  declarations: [GeneratePasswordComponent],
  imports: [
    NgxMaskModule.forRoot(),
    ArchwizardModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MorrisJsModule,
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
  ]
})
export class ProfileModule { }

