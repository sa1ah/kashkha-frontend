import { RegService } from './../../service/reg.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShopOwnerDataService } from '../../service/shop-owner-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-seller-account',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink],
  templateUrl: './seller-account.component.html',
  styleUrl: './seller-account.component.scss',
})
export class SellerAccountComponent implements OnInit {
  isDropdownVisible: boolean = false;
  OwnerDetails: any = null;
  OwnerId: string | null = '';
  isLoading = true;
  shopOwner: any;

  constructor(
    private _ShopOwnerDataService: ShopOwnerDataService,
    private _ActivatedRoute: ActivatedRoute,
    private _HttpClient: HttpClient
  ) {}

  ownerData: any;
  shopId:string='';
  ngOnInit(): void {
    this._ShopOwnerDataService.getShopOwner().subscribe({
      next: (response) => {
        this.isLoading = true;
        console.log(response);
        console.log(response.data);
        this.ownerData = response.data;
        this.isLoading = false;
      },
    });

    this._ActivatedRoute.params.subscribe((params) => {
      this.shopId = params['id'];
      console.log(this.shopId);
      
      this.fetchShopOwnerData(this.shopId);
    });
  }

  fetchShopOwnerData(shopId: string) {
    this._HttpClient
      .get(`https://localhost:7024/api/ShopOwner/${shopId}`)
      .subscribe({
        next: (response) => {
          console.log(response);

          this.shopOwner = response;
          
        },
      });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
