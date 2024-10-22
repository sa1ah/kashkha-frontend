import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegService } from './reg.service';

@Injectable({
  providedIn: 'root',
})
export class ShopOwnerDataService {
  constructor(
    private _HttpClient: HttpClient,
    private _RegService: RegService
  ) {
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }
  MyToken: any = {
    token: localStorage.getItem('_token'),
  };

  getShopOwner(): Observable<any> {
    return this._HttpClient.get(`https://localhost:7024/api/ShopOwner`, {
      headers: this.MyToken,
    });
  }

  getShopById(id:any): Observable<any> {
    return this._HttpClient.get(`https://localhost:7024/api/ShopOwner/${id}`);
  }
}
