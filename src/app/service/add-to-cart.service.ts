import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  constructor(private _HttpClient: HttpClient) {}

  addToCart(userId: string, prodId:string ):Observable<any>{
    return this._HttpClient.post(`https://localhost:7024/api/Cart/${userId}`, {
      productId: prodId,
      quantity: 1,
    });
  };

  getCartUser(userId: string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7024/api/Cart/${userId}`);
  };


  removeCart(prodId:any ):Observable<any>{
    return this._HttpClient.delete(`https://localhost:7024/api/Cart/item/${prodId}`);
  };

}
