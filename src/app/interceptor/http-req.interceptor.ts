import { HttpInterceptorFn } from '@angular/common/http';

export const httpReqInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem('_token');

  if(localStorage.getItem('_token') != null) {
    const token:any = localStorage.getItem('_token');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    // return next(clonedReq);
  }

  return next(req);
};


// import { HttpInterceptorFn } from '@angular/common/http';

// export const httpReqInterceptor: HttpInterceptorFn = (req, next) => {
//   if (localStorage.getItem('_token') != null) {
//     const Mytoken: any = localStorage.getItem('_token');
//     req = req.clone({
//       setHeaders: {
//         token: Mytoken,
//       },
//     }); //return copy req
//   }
//   return next(req);
  // const token = localStorage.getItem('_token');

  // if (token ?? false) {
  //   const clonedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return next(clonedReq);
  // }

  // return next(req);
// };


// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// /--------------------------------------------------------------------/
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   /--------------------------------------------------------------------/
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', Bearer ${token}),
//       });
//       return next.handle(cloned);
//     } else {
//       return next.handle(req);
//     }
//   }
//   /--------------------------------------------------------------------/
// }
