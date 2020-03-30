import { Component, OnInit } from '@angular/core';
import { ValidationMsg } from 'src/app/model/validation';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


import { UserService } from '../../../services/user.service';
import { User } from 'src/app/model/user';
import { AlertService } from '../../../services/alert.service';
import { UserResponse } from '../../../model/response';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public validationMessages: any;
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private storageService: StorageService,
  ) {
    this.validationMessages = new ValidationMsg().validationMsg;
  }

  ngOnInit() {
    // input elements and validations
    this.loginForm = this.formBuilder.group({
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
    });
  }

  onSubmit(loginForm: any): void {
    const loginDetails: User = loginForm.value;
    this.userService.getUserLoginDetails(loginDetails).subscribe(
      res => {
        console.log(res);
        const response: UserResponse = res;
        this.alertService.presentAlert('SUCCESS', response.msg);
        this.storageService.loginUser(res['result']);
      },
      err => {
        console.log(err);
        this.alertService.presentAlert('ERROR', err.error.msg);
      }
    );
  }
}
