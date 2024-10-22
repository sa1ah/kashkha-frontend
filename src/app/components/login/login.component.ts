import { Component } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RegService } from '../../service/reg.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBlankComponent, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _RegService: RegService, private _Router: Router) {}

  errMess: string = '';

  loginForm: FormGroup = new FormGroup({
    
    email: new FormControl('', [Validators.email, Validators.required]),
    
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ),
    ]),
    
  });

  handeleLogin(): void {
    if (this.loginForm.valid) {
      this._RegService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
            // console.log(response);
            // console.log(response.data.value.token);
          if (response.message === 'seccess') {
            //now you navigate user to login page if register is succssful and you can send any thing in url if you want by type in navigate(['', here ])
            localStorage.setItem('_token', response.data.value.token);
            // console.log(response);
            this._RegService.saveUser();
            // this._RegService.IdUser();
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.errMess = err.error.message;
        },
      });
    }
  }
}
