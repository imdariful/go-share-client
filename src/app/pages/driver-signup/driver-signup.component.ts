import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import {
  getToastErrorMessage,
  getToastSuccessMessage,
} from 'src/app/utlt/toaster';

interface FormControlConfig {
  name: string;
  validators: any[];
}

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.scss'],
})
export class DriverSignupComponent {
  error: string | undefined;
  registrationForm!: FormGroup;

  formControlConfigs: FormControlConfig[] = [
    { name: 'name', validators: [Validators.required] },
    { name: 'email', validators: [Validators.required, Validators.email] },
    {
      name: 'password',
      validators: [Validators.required, Validators.minLength(6)],
    },
    { name: 'nid', validators: [Validators.required, Validators.minLength(8)] },
    { name: 'dl', validators: [Validators.required, Validators.minLength(6)] },
    {
      name: 'birth',
      validators: [Validators.required, Validators.minLength(6)],
    },
    { name: 'exp', validators: [Validators.required, Validators.minLength(6)] },
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    let formControls: Record<string, any> = {};
    this.formControlConfigs.forEach((config) => {
      formControls[config.name] = ['', config.validators];
    });
    this.registrationForm = this.fb.group(formControls);
  }

  isValidForm() {
    return this.registrationForm.valid;
  }

  async getUserData() {
    try {
      if (this.isValidForm()) {
        const userData = this.registrationForm.value;
        userData.type = 2;
        const res = await this.auth.signUp(userData);

        if (res.token) {
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
      this.error = error.message;
    }
  }
}
