import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed: boolean = true;
  constructor(private weatherSvc: WeatherService) {}
}
