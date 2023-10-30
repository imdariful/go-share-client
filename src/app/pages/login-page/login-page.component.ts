import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  error: string | undefined;

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private location: Location) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async getUserData() {
    try {
      if (this.registrationForm.valid) {
        const userData = this.registrationForm.value;
        const res = await this.auth.signIn(userData)
        this.registrationForm.reset();
        this.location.historyGo(-1);
      }
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
