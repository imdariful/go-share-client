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
  selector: 'app-singup-page',
  templateUrl: './singup-page.component.html',
  styleUrls: ['./singup-page.component.scss'],
})
export class SingupPageComponent {
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: 1,
    });
  }

  async getUserData() {
    try {
      if (this.registrationForm.valid) {
        const userData = this.registrationForm.value;
        const res = await this.auth.signUp(userData);
        if (res.token) {
          this.registrationForm.reset();
          this.location.historyGo(-2);
        }
      }
      this.toast.success('User created successfully', getToastSuccessMessage());
    } catch (error: any) {
      this.toast.error(
        `User creation failed - ${error.message}`,
        getToastErrorMessage()
      );
      this.error = error.message;
      console.error(error);
    }
  }
}
