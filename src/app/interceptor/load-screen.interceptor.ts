import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ReloadService } from '../service/reload.service';
import { delay, finalize, pipe } from 'rxjs';

export const loadScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(ReloadService);
  busyService.busy();
  return next(req).pipe(
    delay(1000),
    finalize(() => busyService.idle())
  );
};
