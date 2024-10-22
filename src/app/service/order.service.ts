import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _HttpClient: HttpClient) {}


  payment(form: FormData): Observable<any> {
    return this._HttpClient.post(`thttps://localhost:7024/api/Orders`, form);
  }
}
