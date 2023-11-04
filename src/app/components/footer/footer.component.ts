import { Component } from '@angular/core';
import { FooterItems } from 'src/app/config/footerItems';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  footerItems = FooterItems;
}
