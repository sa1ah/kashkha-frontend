import { NgFor, NgIf, NgStyle } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewDetailsService } from '../../service/view-details.service';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-viewdetails',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle],
  templateUrl: './viewdetails.component.html',
  styleUrl: './viewdetails.component.scss',
})
export class ViewdetailsComponent implements AfterViewInit, OnInit {
  sanitizer: any;
  constructor(
    private _ViewDetailsService: ViewDetailsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  productDetails: any = null;
  productId: any | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
    });
    this._ViewDetailsService.viewProd(this.productId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.productDetails = response.data;        
      },
    });
  }

  // getImageZoomStyle(): SafeStyle {
  //   const imageUrl = this.productDetails?.image || '../../../assets/images/corinne-kutz-j_9drN8w6gw-unsplash.jpg';
  //   const style = `--url: url(${imageUrl});
  //                  --zoom-x: 0%;
  //                  --zoom-y: 0%;
  //                  --display: none;
  //                  background-size: cover;
  //                  background-position: center;
  //                  background-repeat: no-repeat;`;
  //   return this.sanitizer.bypassSecurityTrustStyle(style)
  // };

  ngAfterViewInit(): void {
    const imageZoom = document.getElementById(
      'imageZoom'
    ) as HTMLElement | null;
    const imagZoom = document.getElementById('imagZoom') as HTMLElement | null;
    if (imageZoom) {
      imageZoom.addEventListener('mousemove', (event: MouseEvent) => {
        if (imageZoom) {
          imageZoom.style.setProperty('--display', 'block');
          const rect = imageZoom.getBoundingClientRect();
          const pointer = {
            x: ((event.clientX - rect.left) * 100) / rect.width,
            y: ((event.clientY - rect.top) * 100) / rect.height,
          };
          imageZoom.style.setProperty('--zoom-x', pointer.x + '%');
          imageZoom.style.setProperty('--zoom-y', pointer.y + '%');
        }
      });

      imageZoom.addEventListener('mouseout', () => {
        if (imageZoom) {
          imageZoom.style.setProperty('--display', 'none');
        }
      });
    }

    if (imagZoom) {
      imagZoom.addEventListener('mousemove', (event: MouseEvent) => {
        if (imagZoom) {
          imagZoom.style.setProperty('--display', 'block');
          const rect = imagZoom.getBoundingClientRect();
          const pointer = {
            x: ((event.clientX - rect.left) * 100) / rect.width,
            y: ((event.clientY - rect.top) * 100) / rect.height,
          };
          imagZoom.style.setProperty('--zoom-x', pointer.x + '%');
          imagZoom.style.setProperty('--zoom-y', pointer.y + '%');
        }
      });

      imagZoom.addEventListener('mouseout', () => {
        if (imagZoom) {
          imagZoom.style.setProperty('--display', 'none');
        }
      });
    }
  }
}