import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetproductService } from '../../service/getproduct.service';
import { response } from 'express';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  selectedRole: string = 'woman';
  constructor(private _GetproductService: GetproductService) {}
  ProductForm: FormGroup = new FormGroup({
    ProductName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });

  handelProduct(): void {
    const formData = new FormData();
    if (this.ProductForm.valid) {
      Object.keys(this.ProductForm.controls).forEach((key) => {
        formData.append(key, this.ProductForm.get(key)?.value);
      });
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this._GetproductService.AddProduct(formData).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          console.log(response);
        }
      },
    });
  }

  // onRoleChange(event: any): void {
  //   this.selectedRole = event.target.value;
  //   if (this.selectedRole === 'Customer') {
  //     this.ProductForm.get('categoryId')?.reset();
  //   }
  // }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      this.ProductForm.get('image')?.setValue(file);
    } else {
      console.log('No file selected');
    }
  }
  // @ViewChild('imgPreview') imgPreview!: ElementRef;

  // previewImage(event: Event): void {
  //   const fileInput = event.target as HTMLInputElement;
  //   const file = fileInput?.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const imgElement = document.createElement('img');
  //       imgElement.src = e.target?.result as string;
  //       imgElement.alt = 'Product Image Preview';
  //       imgElement.style.maxWidth = '100%';
  //       imgElement.style.height = 'auto';

  //       this.imgPreview.nativeElement.innerHTML = '';
  //       this.imgPreview.nativeElement.appendChild(imgElement);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
}
