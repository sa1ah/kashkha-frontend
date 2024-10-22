import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import * as jwtDecode from 'jwt-decode';
import { JwtModule } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class RegService {
  constructor(private _HttpClient: HttpClient) {
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }

  registerForm(userData: FormData): Observable<any> {
    return this._HttpClient
      .post(`https://localhost:7024/api/Account/register`, userData, {
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          // Convert text response to an object
          return { message: response };
        })
      );
  }

  loginForm(userData: any): Observable<any> {
    return this._HttpClient.post(
      `https://localhost:7024/api/Account/login`,
      userData
    );
  }

  saveUser() {
    const encode = localStorage.getItem('_token');
    if (encode) {
      var decode: any = jwtDecode(encode);
      console.log(decode);
      return decode[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
  }

  IdUser() {
    const encode = localStorage.getItem('_token');
    if (encode) {
      var decode: any = jwtDecode(encode);
      var userid =
        decode[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
        console.log(userid);
      return userid;
    }
  }

}
