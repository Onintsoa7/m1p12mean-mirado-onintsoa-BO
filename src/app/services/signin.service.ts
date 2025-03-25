import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../core/constants';
import { map, Observable } from 'rxjs';
import { User, UserLogin } from '../core/models/user';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient) {}
  public signupUser(user: User): Observable<any> {
    return this.http
      .post<any>(Constants.SIGNUP_API, user, { observe: 'response' })
      .pipe(map((res => {
        return res;
    })));
  }
  public loginUser(user: UserLogin): Observable<any> {
    return this.http
      .post<any>(Constants.LOGIN_API, user, { observe: 'response' })
      .pipe(map(res => {
        return res;
    }));
  }
}
