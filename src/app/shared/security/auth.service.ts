import {
  Role
} from './role';
import {
  User,
  LoginResponse
} from './user';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import {
  HttpClient
} from '@angular/common/http';

import {
  environment
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
  roleAs: string;

  users: User[] = [];

  constructor(private httpCall: HttpClient) {}

  login(uname: string, pwd: string) {

    return this.httpCall.post < any > (environment.apiUrl + 'user_api/login/', {
        uname,
        pwd
      })
      .pipe(map(Data => {
        if (Data.LoggedIn) {

          localStorage.setItem('STATE', 'true');
          localStorage.setItem('User_id', Data.Profile.userID);
          localStorage.setItem('ROLE', Data.Profile.user_role);
          if (Data.Profile.user_role === 'Admin'){
            localStorage.setItem('AdminId', Data.Profile.admin_id);
          }
          localStorage.setItem('USERIMG', Data.Profile.profilepic);
          if (Data.Profile.lastname !== null) {
            localStorage.setItem('FULLNAME', Data.Profile.firstname + ' ' + Data.Profile.lastname);
          } else {
            localStorage.setItem('FULLNAME', Data.Profile.firstname);
          }
          localStorage.setItem('Token', Data.Token);
          this.isLogin = true;
        } else {
          this.roleAs = '';
          this.isLogin = false;
          localStorage.setItem('STATE', 'false');
          localStorage.setItem('Token', 'false');
          localStorage.setItem('User_id', '-1');
        }
        return Data;
      }));



  }

  ForgetPassword(uname: string){
    return this.httpCall.post < boolean > (environment.apiUrl + 'user_api/forgetpasswrod/', {
      uname
    })
    .pipe(map(Data => {
      return Data;
    }));
  }

  CheckActivate(Code: string) {
    return this.httpCall.post < boolean > (environment.apiUrl + 'user_api/activationcheck/', {
        Code
      })
      .pipe(map(Data => {
        return Data;
      }));
  }

  Activate(pwd: string, UrlActive: string) {

    return this.httpCall.post < any > (environment.apiUrl + 'user_api/activate/', {
        UrlActive,
        pwd
      })
      .pipe(map(Data => {
        if (Data.LoggedIn) {

          localStorage.setItem('STATE', 'true');
          localStorage.setItem('User_id', Data.Profile.userID);
          localStorage.setItem('ROLE', Data.Profile.user_role);
          
          localStorage.setItem('USERIMG', Data.Profile.profilepic);
          if (Data.Profile.lastname !== null) {
            localStorage.setItem('FULLNAME', Data.Profile.firstname + ' ' + Data.Profile.lastname);
          } else {
            localStorage.setItem('FULLNAME', Data.Profile.firstname);
          }
          localStorage.setItem('Token', Data.Token);

        
          this.isLogin = true;
        } else {
          this.roleAs = '';
          this.isLogin = false;
          localStorage.setItem('STATE', 'false');
          localStorage.setItem('Token', 'false');
          localStorage.setItem('User_id', '-1');
          localStorage.setItem('AdminId', '-1');
        }
        return Data;
      }));



  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    localStorage.setItem('FULLNAME', '');
    localStorage.setItem('USERIMG', '');
    localStorage.setItem('Token', '');
    localStorage.setItem('AdminId', '-1');
    localStorage.setItem('User_id', '-1');
    return of({
      success: this.isLogin,
      role: ''
    });
  }


  LoggedInUserId():number {

    return parseFloat(localStorage.getItem('AdminId'));
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getUserId() {
    return localStorage.getItem('User_id');
  }
  getRole() {
    return localStorage.getItem('ROLE');
  }
  getUserFullName() {
    return localStorage.getItem('FULLNAME');
  }
  getUserImg() {
    return localStorage.getItem('USERIMG');
  }

  getToken() {
    return localStorage.getItem('Token');
  }
}
