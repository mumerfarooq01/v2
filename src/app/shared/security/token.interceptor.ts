import {
  Injectable
} from '@angular/core';
import {
  Route,
  Router,
  NavigationStart
} from '@angular/router';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private router: Router ) {}
  private getTimezoneOffsetCheck(): string {

const date = new Date(); 
    return (String(new Date(date.getTime() - date.getTimezoneOffset()*60*1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')));

  }
  

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {



    let token = '';
    if (localStorage.getItem('Token')) {

      token = localStorage.getItem('Token');

    }


    request = request.clone({
      headers: request.headers.set('Authorization', token)
    });

    request = request.clone({
      headers: request.headers.set('Time', this.getTimezoneOffsetCheck())
    });

    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {

          if (err.status != 401) {

            return;
          } else {
            let URl = this.router.routerState.snapshot.url;

            localStorage.removeItem('mode');
            if (URl.includes('admin')) {
              this.router.navigate(['admin/login']);
            } else if (URl.includes('company')) {
              this.router.navigate(['company/login']);
            } else {
              this.router.navigate(['login']);
            }
          }
        }
      }));
  }
}
