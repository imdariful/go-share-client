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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async getUserData() {
    if (this.registrationForm.valid) {
      
      const userData = this.registrationForm.value;
      const res = await this.auth.singIn(userData)
      if(!res.token){
        this.error = res.message;
      }
      else{
        this.registrationForm.reset();
        this.router.navigate(['/profile']);
      }
      
    }
  }
}
