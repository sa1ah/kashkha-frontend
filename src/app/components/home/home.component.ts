import { RegService } from './../../service/reg.service';
import { ForYouItemService } from './../../service/for-you-item.service';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { prodForYou } from '../../../Interface/ProductForYou';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GetproductService } from '../../service/getproduct.service';
import { response } from 'express';

import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { ShopOwnerDataService } from '../../service/shop-owner-data.service';
import { AddToCartService } from '../../service/add-to-cart.service';
import { AddFavouritService } from '../../service/add-favourit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    ScrollToTopComponent,
    NgFor,
    CurrencyPipe,
    NgClass,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NavBlankComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private _ForYouItemService: ForYouItemService,
    private _GetproductService: GetproductService,
    private _RegService: RegService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ShopOwnerDataService: ShopOwnerDataService,
    private _AddToCartService: AddToCartService,
    private _AddFavouritService: AddFavouritService
  ) {}

  categoryName: any[] = [];

  prodFor: prodForYou[] = [];
  womanProd: [] = [];
  imgpath: string = 'https://image.tmdb.org/t/p/w500';

  isCustomer: boolean = false;
  UId: string = '';
  ngOnInit(): void {
    this._GetproductService.getProduct('').subscribe({
      next: (response) => {
        this.categoryName = response.data;
        // console.log('Products for category:', '', response);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });

    this.UId = this._RegService.IdUser();
    // this._RegService.saveUser();

    // this.checkUserRole();
  }

  // checkUserRole() {
  //   this.isCustomer = this._AuthService.isCustomer(); // Implement this method in your AuthService
  // }

  // navigateToSellerProfile(shopId: string) {
  //   if (this.isCustomer) {
  //     this.router.navigate(['seller-account', shopId]);
  //   }
  // }

  getprodCatName(categName: string): void {
    this._GetproductService.getProduct(categName).subscribe({
      next: (response) => {
        this.categoryName = response.data;
        console.log('Products for category:', categName, response);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }




  getShop(id: any): void {
    console.log('Fetching shop with ID:', id);
    this._ShopOwnerDataService.getShopById(id).subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          console.log(response);

          this._Router.navigate(['seller-account', id]);
        }
      },
      error: (error) => {
        console.error('Error fetching shop:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(
            `Server-side error: ${error.status} ${error.statusText}`
          );
          console.error('Error body:', error.error);
        }
      },
    });
  }

  // womanprod():void{
  //   this.prodFor = this.womanProd;
  // }

  addProdCart(userId: any, id: any): void {
    this._AddToCartService.addToCart(id, userId).subscribe({
      next: (response) => {
        console.log(response);
        console.log(userId, id);
      },
    });
  }

  addToFavourites(id: any): void {
    const item = {
      prodId: id,
    };
    this._AddFavouritService.addToFav(item).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
    console.log(id);
  }

  offerSilder: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    nav: false,
  };

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    autoplay: false,
    // autoplayTimeout: 2000,
    navText: [
      '<i class="fa-solid fa-chevron-right"></i>',
      '<i class="fa-solid fa-chevron-left"></i>',
    ],
    margin: 20,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
}
