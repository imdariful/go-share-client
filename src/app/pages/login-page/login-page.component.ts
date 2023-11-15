import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/utlt/toaster';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  error: string | undefined;

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private location: Location,
    private toast: HotToastService
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async getUserData() {
    if (!this.registrationForm.valid) {
      this.toast.error(
        `Please check email and password field again.`,
        getToastErrorMessage()
      );
      return;
    }

    try {
      const userData = this.registrationForm.value;
      const res = await this.auth.signIn(userData);
      this.registrationForm.reset();
      this.location.historyGo(-1);
      this.toast.success('Sign in successful', getToastSuccessMessage());
    } catch (error: any) {
      this.toast.error(
        `Ops - Sign in Failed! - ${error?.message}`,
        getToastErrorMessage()
      );
      console.error(error);
      this.error = error.message;
    }
  }
}
