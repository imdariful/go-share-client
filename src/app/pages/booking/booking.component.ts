import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}

  id:number=1;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      this.id = +id!;
      console.log(this.id);
    });
    
  }
  


}

