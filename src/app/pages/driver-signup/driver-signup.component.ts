import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/utlt/toaster';

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.scss'],
})
export class DriverSignupComponent {
  error: string | undefined;

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nid: ['', [Validators.required, Validators.minLength(8)]],
      dl: ['', [Validators.required, Validators.minLength(6)]],
      birth: ['', [Validators.required, Validators.minLength(6)]],
      exp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async getUserData() {
    try {
      if (this.registrationForm.valid) {
        const userData = this.registrationForm.value;
        userData.type = 2;
        const res = await this.auth.signUp(userData);

        if (res.token) {
          console.log('iddd', res.token);
          this.registrationForm.reset();
          this.toast.success(
            'Driver account created successfully',
            getToastSuccessMessage()
          );
          this.router.navigate(['/dashboard/profile']);
        }
      }
    } catch (error: any) {
      this.toast.error(
        `Driver account creation failed - ${error.message}}`,
        getToastErrorMessage()
      );
      console.error(error);
      this.error = error.message;
    }
  }
}
