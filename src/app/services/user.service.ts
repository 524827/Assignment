import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htthp: HttpClient) { }

/**
 * @function setUserRegistration() - Function for save user details
 * @param userDetails - User details
 */
  setUserRegistration(userDetails: User): Observable<object> {
    return this.htthp.post(environment.userRegistration, userDetails);
  }

  /**
   * @function getUserLoginDetails() - This function fetch login details from server
   * @param userDetails - User login details
   */
  getUserLoginDetails(userDetails: User): Observable<object> {
    const user = {
      email: userDetails.username,
      password: userDetails.password
    };
    return this.htthp.get(environment.userLogin, {params: user});
  }


  logoutUser(token: string): Observable<object> {
    const header = new HttpHeaders().set('Authorization', 'Bearer' + token);
    return this.htthp.get(environment.userLogout, {headers: header});
  }
}


