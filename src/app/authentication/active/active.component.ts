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
  Validators,
  FormControl
} from '@angular/forms';
import {
  Role
} from './../../shared/security/role';
import {
  CustomValidators
} from 'ng2-validation';
@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.sass']
})
export class ActiveComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  hide = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {


    this.authService.CheckActivate(this.route.snapshot.params.ActiveId)
      .subscribe(Data => {
        if (Data) {
          this.hide=true;
          this.error = '';
        } else {
          this.error = 'Link Expired';
          this.hide=false;
        }
      }, Error => {
        this.error = 'Link Expired';
        this.hide=true;
      });



    let password = new FormControl('', Validators.required);
    this.loginForm = this.formBuilder.group({
      password: password,
      cnfirmpass: ['', CustomValidators.equalTo(password)],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Password and Confirm Password Doest not match !';
      return;
    } else {
      this.authService
        .Activate(this.f.password.value,this.route.snapshot.params.ActiveId)
        .subscribe(
          (res) => {
            if (res.LoggedIn) {
              const role = this.authService.getRole();

              if (role === Role.All || role === Role.Admin || role === Role.Refferer) {
                console.log(123);
                this.router.navigate(['/admin/dashboard/main']);
              } else if (role === Role.Doctor) {
                this.router.navigate(['/doctor/dashboard']);
              } else if (role === Role.Patient) {
                this.router.navigate(['/patient/dashboard']);
              } else {
                this.router.navigate(['/authentication/signin']);
              }
            } else {
              this.error = 'Link Expired Please Try again';
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
