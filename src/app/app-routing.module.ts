import { AuthGuard } from './shared/security/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from './shared/security/role';
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      role: Role.Admin,
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'appointment',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./apointment/apointment.module').then((m) => m.ApointmentModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'doctor',
    canActivate: [AuthGuard],
    data: {
      role: Role.Doctor,
    },
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'assitant',
    canActivate: [AuthGuard],
    data: {
      role: Role.Assitant,
    },
    loadChildren: () =>
      import('./assitant/assitant.module').then((m) => m.AssitantModule),
  },
  {
    path: 'refferer',
    canActivate: [AuthGuard],
    data: {
      role: Role.Refferer,
    },
    loadChildren: () =>
      import('./refferer/refferer.module').then((m) => m.ReffererModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'extra-pages',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./extra-pages/extra-pages.module').then(
        (m) => m.ExtraPagesModule
      ),
  },
  {
    path: 'multilevel',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./multilevel/multilevel.module').then((m) => m.MultilevelModule),
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
