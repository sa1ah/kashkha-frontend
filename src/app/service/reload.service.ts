import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  busyRequest = 0;
  constructor(private _NgxSpinnerService: NgxSpinnerService) {}

  busy() {
    this.busyRequest++;
    this._NgxSpinnerService;
    this._NgxSpinnerService.show(undefined, {
      type: 'ball-scale-ripple',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#ffff',
      size: 'default',
    });
  }
  idle() {
    this.busyRequest--;
    if (this.busyRequest <= 0) {
      this.busyRequest = 0;
      this._NgxSpinnerService.hide();
    }
  }
}
