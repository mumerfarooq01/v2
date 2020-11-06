import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'adminuser',
    loadChildren: () =>
      import('./adminmanagment/adminmanagment.module').then((m) => m.AdminmanagmentModule),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctormangment/doctormangment.module').then((m) => m.DoctormangmentModule),
  },
  {
    path: 'refferer',
    loadChildren: () =>
      import('./refferermanagment/refferermanagment.module').then((m) => m.RefferermanagmentModule),
  },
  {
    path: 'assitant',
    loadChildren: () =>
      import('./assitantmanagment/assitantmanagment.module').then((m) => m.AssitantmanagmentModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
