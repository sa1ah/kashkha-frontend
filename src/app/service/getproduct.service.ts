import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetproductService {
  constructor(private _HttpClient: HttpClient) {
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }

  MyToken: any = {
    token: localStorage.getItem('_token'),
  };

  getProduct(catName: string): Observable<any> {
    return this._HttpClient.get(
      `https://localhost:7024/api/Product?categoryName=${catName}`
    );
  }

  AddProduct(prodData: FormData): Observable<any> {
    return this._HttpClient.post(
      `https://localhost:7024/api/Product`,
       prodData 
    );
  }
}
