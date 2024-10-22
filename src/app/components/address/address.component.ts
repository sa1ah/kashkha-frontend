import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  cartId: number= 1 ;
  constructor(private route: ActivatedRoute) {}
  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //     this.cartId = params['id'];
  //     // Now you can use this.cartId in your form or wherever needed
  //   });
  // }
  
}
