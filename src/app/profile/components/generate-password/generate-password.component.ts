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
import { ProfileServiceService } from '../../services/profile-service.service';
import { CustomValidators } from 'ng2-validation';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.sass']
})
export class GeneratePasswordComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;
  error: string;
  success: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileservice: ProfileServiceService,
    private snackBar: MatSnackBar
  ) { }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ngOnInit(): void {

    const password = new FormControl('', Validators.required);
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));

    this.resetForm = this.formBuilder.group({
      password: password,
      rpassword: certainPassword
    });
  }

  get f() {
    return this.resetForm.controls;
  }
  onSubmit() {
    this.error = '';
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    } else {
      const FormData = {
        password: this.resetForm.controls.password.value
      };
      this.profileservice.UpdatePassword(FormData)
      .subscribe(Data => {
        if(Data){
          this.showNotification(
            'snackbar-success',
            'Password updated',
            'top',
            'righ');
        }else{
          this.showNotification(
            'snackbar-error',
            'Error Encountered. Please try again later',
            'top',
            'righ');
        }
      }, Error => {
        this.showNotification(
          'snackbar-error',
          'Error Encountered. Please try again later',
          'top',
          'righ');
      });
    }
  }

}
