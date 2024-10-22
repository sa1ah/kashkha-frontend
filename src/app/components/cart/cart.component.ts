import { Component, OnInit } from '@angular/core';
import { AddToCartService } from '../../service/add-to-cart.service';
import { RegService } from '../../service/reg.service';
import { response } from 'express';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  UId: string = '';
  cartDetails:any =[];
  router: any;
  constructor(
    private _AddToCartService: AddToCartService,
    private _RegService: RegService
  ) {}

  
  ngOnInit(): void {
    this.UId = this._RegService.IdUser();
    this._AddToCartService.getCartUser(this.UId).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartDetails = response
      }
    })
  }

  removeCart(prodId:any):void{
    this._AddToCartService.removeCart(prodId).subscribe({
      next:(response)=>{
        console.log(response);
        window.location.reload();
      }
    })
  }


  // getCartId(id:number):void{
  //   this.router.navigate(['/address'], { queryParams: { id: id } });
  // }

}





