import {
  AuthService
} from './../../shared/security/auth.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Role
} from './../../shared/security/role';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  hide = true;
  mspPattren = "^((\\+91-?)|0)?[0-9]{5}$";
  ShowPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.mspPattren)]],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'MSP OR Password incorrect !';
      return;
    } else {
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res.LoggedIn) {
              const role = this.authService.getRole();

              if (role === Role.All || role === Role.Admin || role === Role.Refferer) {

                const BookingId = localStorage.getItem('bookingid');
                const Booking = localStorage.getItem('booking');

                if (role === Role.Refferer) {
                  // localStorage.removeItem('booking');
                  // localStorage.removeItem('bookingid');
                  this.router.navigate(['/appointment/add-new/']);
                } else {
                  this.router.navigate(['/admin/dashboard/main']);
                }
              } else if (role === Role.Doctor) {
                this.router.navigate(['/doctor/dashboard']);
              } else if (role === Role.Patient) {
                this.router.navigate(['/patient/dashboard']);
              } else if (role === Role.Assitant) {
                this.router.navigate(['/assitant/dashboard']);
              } else {
                this.router.navigate(['/authentication/signin']);
              }
            } else {
              this.error = res.message;
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
          }
        );
    }
  }
}
