import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'settings',
    component: SettingsComponent,
  }, {
    path: 'schedule',
    loadChildren: () =>
      import('./doctor-schedule/doctor-schedule.module').then((m) => m.DoctorScheduleModule),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
