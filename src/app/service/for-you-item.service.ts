  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForYouItemService {
  constructor(private _HttpClient: HttpClient) {
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }
  // myheader = {
  //   accept: 'application/json',
  //   Authorization:
  //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGZkNDYwMjY2YzIwOTJlZGQ0NGJhODczNmI5NTBhMSIsIm5iZiI6MTcyNTMzNjI3OC43ODc2MDMsInN1YiI6IjY2YjkxZDhmZjY4MTViNTBhZWQ1OWM2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QXpYq5H8VDkSpNy7HhIjrM23PN2cK4j9Qll-thSrFaw',
  // };

  getItems(): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
      // {
      //   headers: this.myheader,
      // }
    );
  }

  getProducts(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
  }
}
