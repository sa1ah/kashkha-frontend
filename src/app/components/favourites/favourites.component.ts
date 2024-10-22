import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, AfterViewInit, viewChild, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { AddFavouritService } from '../../service/add-favourit.service';
import { response } from 'express';
import { RegService } from '../../service/reg.service';
import { AddToCartService } from '../../service/add-to-cart.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CarouselModule, CommonModule, NgFor],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'], // Corrected this line
})
export class FavouritesComponent implements AfterViewInit, OnInit {
  images: object[] = [
    { src: '../../../assets/images/chewy-fGxiRXr2oZg-unsplash.jpg' },
    { src: '../../../assets/images/corinne-kutz-j_9drN8w6gw-unsplash.jpg.jpg' },
    {
      src: '../../../assets/images/joanna-nix-walkup-h3stFPAyn7E-unsplash.jpg',
    },
  ];

  imgSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 2000,
    navSpeed: 700,
    items: 1,
    nav: false,
    autoWidth: false,
    margin: 10,
  };

  @ViewChild('targ') scrollTarget!: ElementRef;
  // private _AddToCartService: any;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AddFavouritService: AddFavouritService,
    private _Renderer2: Renderer2,
    private _RegService: RegService,
    private _AddToCartService: AddToCartService
  ) {}
  UId: string = '';

  ngAfterViewInit(): void {
    this._ActivatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }
    });
  }

  favUsr: any;
  ngOnInit(): void {
    this._AddFavouritService.getFav().subscribe({
      next: (response) => {
        console.log(response);
        this.favUsr = response;
      },
    });

    this.UId = this._RegService.IdUser();
  }

  removFav(id: any, btnremove: HTMLButtonElement): void {
    this._AddFavouritService.removeFav(id).subscribe({
      next: (response) => {
        console.log(response);
        this._Renderer2.removeAttribute(btnremove, 'disabled');
        window.location.reload();
      },
    });
  }

  addProdCart(userId: any, id: any): void {
    this._AddToCartService.addToCart(id, userId).subscribe({
      next: (response) => {
        console.log(response);
        console.log(userId, id);
      },
    });
  }
}


