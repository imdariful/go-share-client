import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private title: Subject<any> = new Subject<any>();

  constructor() { }

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<any> {
    return this.title.asObservable();
  }


}
