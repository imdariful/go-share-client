import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from 'src/app/interfaces/location';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booking-location',
  templateUrl: './booking-location.component.html',
  styleUrls: ['./booking-location.component.scss']
})
export class BookingLocationComponent {
  @Output() setLocation = new EventEmitter<Location>();


  minDate: Date;
  minTime: Date | undefined;

  registrationForm: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.minDate = new Date();
    this.minTime = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.minTime.setHours(0);
    this.minTime.setMinutes(0);
    this.registrationForm = this.fb.group({
      load_location: ['', [Validators.required]],
      unload_location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    })
  }


  async getLocation_Time() {
    if (this.registrationForm.valid) {

      const loaction_Time = this.registrationForm.value;
      console.log(loaction_Time);
      this.setLocation.emit(loaction_Time);
      // this.registrationForm.reset();
    }else{
      throw new Error('Invalid form');
    }
  }

  ngOnInit(): void {
    console.log(this.route.url);
  }
}
