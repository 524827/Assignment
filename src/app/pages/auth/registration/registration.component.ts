import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationMsg } from 'src/app/model/validation';

import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { AlertService } from '../../../services/alert.service';
import { UserResponse } from '../../../model/response';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public validationMessages: any;
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.validationMessages = new ValidationMsg().validationMsg;
  }

  ngOnInit() {
    // reactive input and its validation
    this.registrationForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.pattern('(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'),
          Validators.required,
        ]),
      ],
      confirmPassword: ['', Validators.compose([this.equalto('password')])],
    });
  }

  /**
   * @function navigateBack()- function for navigate back
   */
  navigateBack(): void {
    this.router.navigate(['/login']);
  }

  /**
   * @function onSubmit() - function for sumbit user details to server
   * @param registrationForm - contain input values
   */
  onSubmit(registrationForm: any): void {
    const userDetails: User = registrationForm.value;
    this.userService.setUserRegistration(userDetails).subscribe(
      res => {
        const response: UserResponse = res;
        this.alertService.presentAlert('success', response.msg);
        this.router.navigate(['login']);
      },
      err => {
        this.alertService.presentAlert('error', err.error.msg);
      }
    );
  }

  /**
   * @function equalTo() - function for validate password and confirm password
   * @param fieldname - password
   */
  equalto(fieldname: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[fieldname] === input;
      if (!isValid) {
        return { equalTo: { isValid } };
      } else {
        return null;
      }
    };
  }
}
