import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      if (route.data.role === 'Admin' && userRole !== 'Admin' && userRole !== 'All' && userRole !== 'Refferer'  ){
        return false;
      }else  if (route.data.role !== 'Admin' && route.data.role && route.data.role.indexOf(userRole) === -1) {
        if (url.includes('appointment/add-new/')){
          var array = url.split("/");
          localStorage.setItem('bookingid', array[3]);
          localStorage.setItem('booking', 'True' );
         }else{
           localStorage.removeItem('bookingid');
           localStorage.removeItem('booking');
         }
        this.router.navigate(['/authentication/signin']);
        return false;
      }
      return true;
    }
    if (url.includes('appointment/add-new/')) {
      var array= url.split("/");
      localStorage.setItem('bookingid',array[3]);
      localStorage.setItem('booking','True' );
     } else{
       localStorage.removeItem('bookingid');
       localStorage.removeItem('booking');
     }

    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
