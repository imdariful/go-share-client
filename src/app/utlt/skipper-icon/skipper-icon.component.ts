import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skipper-icon',
  templateUrl: './skipper-icon.component.html',
  styleUrls: ['./skipper-icon.component.scss']
})
export class SkipperIconComponent {

  @Input() title: string = ''; 
  @Input() id: number | undefined;
  @Input() index: number = 1;
}
