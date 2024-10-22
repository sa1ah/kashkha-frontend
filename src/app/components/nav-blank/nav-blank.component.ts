import { routes } from './../../app.routes';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RegService } from '../../service/reg.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  // isActive:boolean=false;

  // toggelIcon(){
  //   if(this.isActive == false){
  //     this.isActive=true;
  //   }else{
  //     this.isActive=false
  //   }
  // }

  showProfile: any = '';
  switchlogging: any = '';

  ngOnInit(): void {
    this.updateSignInOutStatus();
    this.showProfile = this._RegService.saveUser();

  }

  constructor(private _Router: Router, private _RegService: RegService) {}

  navigateToSection() {
    this._Router.navigate(['/favourites'], { fragment: 'targ' });
  }

  updateSignInOutStatus(): void {
    this.switchlogging = localStorage.getItem('_token')
      ? 'Sign out'
      : 'Sign in';
  }

  signout(): void {
    if (localStorage.getItem('_token')) {
      localStorage.removeItem('_token');

      this._Router.navigate(['/login']);
      // this.switchlogging = "Sign in";
    } else {
      this._Router.navigate(['/login']);
    }
    this.updateSignInOutStatus();
  }

  
}
