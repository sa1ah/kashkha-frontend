import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddFavouritService {
  constructor(private _HttpClient: HttpClient) {}

  MyToken: any = {
    token: localStorage.getItem('_token'),
  };

  addToFav(item: any): Observable<any> {
    return this._HttpClient.post<any>(
      `https://localhost:7024/api/Favorite`,
      item
    );
  }

  getFav(): Observable<any> {
    return this._HttpClient.get(`https://localhost:7024/api/Favorite/Favorite`);
  }


  removeFav(id:any):Observable<any>{
    return this._HttpClient.delete(`https://localhost:7024/api/Favorite/${id}`);
  }
}



// [
//   {
//     id: 0,
//     userId: 'string',
//     productId: 0,
//     createdAt: '2024-09-18T21:50:23.109Z',
//     product:{
//       id:1,
//       name:"hamada"
//     }
//   },
// ];
