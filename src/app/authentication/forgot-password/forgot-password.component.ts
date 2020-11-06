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
  AuthService
} from './../../shared/security/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: string;
  success: string;
  mspPattren = "^((\\+91-?)|0)?[0-9]{5}$";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.mspPattren)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.error = '';
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.ForgetPassword(this.loginForm.controls.username.value)
        .subscribe(Data => {
          if (Data) {
            this.success = 'Please check your email for password';
            this.error = '';
          } else {
            this.error = 'MSP is not registered';
            this.success = '';
          }
        }, Error => {
          this.error = 'MSP is not registered';
          this.success = '';
        });
    }
  }
}
