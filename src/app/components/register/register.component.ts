import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegService } from '../../service/reg.service';
import { Router } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _RegService: RegService, private _Router: Router) {}

  errMess: string = '';
  admin: string = '';
  check: boolean = false;
  selectedRole: string = 'Customer';

  // registerFrom: FormGroup = new FormGroup({
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(30),
  //   ]),
  //   email: new FormControl('', [Validators.email, Validators.required]),
  //   phone: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^01[0125][0-9]{8}$/),
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(
  //       /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  //     ),
  //   ]),
  //   c_Password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(
  //       /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  //     ),
  //   ]),
  //   rolename: new FormControl('Customer'),
  //   // checkbox: new FormControl('', [Validators.required]),
  //   Shop: new FormGroup({
  //     ShopName: new FormControl(''),
  //     City: new FormControl(''),
  //     Street: new FormControl(''),
  //     ProfilePicture: new FormControl(null),
  //   }),
  // });

  registerFrom: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
    c_Password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
    rolename: new FormControl('Customer', Validators.required),
    Shop: new FormGroup({
      ShopName: new FormControl(''),
      City: new FormControl(''),
      Street: new FormControl(''),
      ProfilePicture: new FormControl(null),
    }),
  });

  handeleRegister(): void {

    if (this.registerFrom.valid) {
      const formData = new FormData();
      Object.keys(this.registerFrom.controls).forEach((key) => {
        if (key === 'Shop') {
          const shopFormGroup = this.registerFrom.get('Shop') as FormGroup;
          Object.keys(shopFormGroup.controls).forEach((shopKey) => {
            const value = shopFormGroup.get(shopKey)?.value;
            if (shopKey === 'ProfilePicture' && value) {
              console.log('Appending file:', value);
              formData.append('Shop.ProfilePicture', value, value.name);
            } else {
              formData.append(`Shop.${shopKey}`, value);
            }
          });
        } else {
          formData.append(key, this.registerFrom.get(key)?.value);
        }
      });

      console.log('FormData contents:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this._RegService.registerForm(formData).subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          if (
            response.message === 'seccess' ||
            response.message === "{\"message\":\"sucessed\"}"
          ) {
            console.log('Registration successful');
            // Handle successful registration
            this._Router.navigate(['/login']);
          } else {
            this.errMess = 'Registration failed: ' + response.message;
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errMess = `Registration failed: ${err.status} ${err.statusText}. ${err.error}`;
        },
      });
    } else {
      console.log('Form is invalid:', this.registerFrom.errors);
    }
  }

  onRoleChange(event: any): void {
    this.selectedRole = event.target.value;
    if (this.selectedRole === 'Customer') {
      this.registerFrom.get('Shop')?.reset();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      this.registerFrom.get('Shop.ProfilePicture')?.setValue(file);
    } else {
      console.log('No file selected');
    }
  }
}
