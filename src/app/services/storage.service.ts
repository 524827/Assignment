import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private nativeStorage: NativeStorage,
              private router: Router,
              private userService: UserService,
              private alerService: AlertService) { }


  /**
   * @function loginUser() - This function get user details and store it to the Native Storage
   * @param userName - contain user name
   * @param userPassword - contain user password
   */
  loginUser(user: any): void {
    console.log(user);
    // Setting item to native storage.
    const email = user.email;
    const userToken = user.token;
    this.nativeStorage
      .setItem('loginCredentials', {
        user: email ,
        token: userToken,
        authState: true
      })
      .then(() => {
        console.log('data store');
        this.authState.next(true);
      }, error => {
        console.error('Error storing item', error);
      });
   /*  const user = { user: userEmail, authState: true };
    localStorage.setItem('loginCredentials', JSON.stringify(user));
    this.authState.next(true); */
  }

  // This function return Subject boolean value
  isAuthenticated(): boolean {
    console.log(this.authState.value);
    return this.authState.value;
  }
  /**
   * This function check if user details are exists or not in native storage.
   * If user details exist then authState value is assign to true
   */
  ifLoggedIn(): void {
    this.nativeStorage.getItem('loginCredentials').then(response => {
      if (response) {
        this.authState.next(true);
      }
    });
    /* const user = localStorage.getItem('loginCredentials');
    const userDetails = JSON.parse(user);
    if (userDetails) {
      console.log(userDetails);
      this.authState.next(true);
    } */
  }


  /**
   * This function call when user logout from application.
   * User will navigate to the home page
   */
  logOut(): void {
   // localStorage.removeItem('loginCredentials');

    this.nativeStorage.getItem('loginCredentials').then(response => {
      const token = response.token;
      if (token) {
        this.userService.logoutUser(token).subscribe(res => {
          this.alerService.presentAlert('SUCCESS', res['msg']);
          this.nativeStorage.remove('loginCredentials');
          this.router.navigate(['login']);
          this.authState.next(false);
        }, err => {
          this.alerService.presentAlert('ERROR', err.msg);
        });
      }
    });
  }
}
