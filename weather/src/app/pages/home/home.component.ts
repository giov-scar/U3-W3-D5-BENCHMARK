import { IWeatherResp } from 'src/app/interfaces/iweather-resp';
import { WeatherService } from './../../weather.service';
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/class/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: Data = new Data('', 0, '', 0, 0, '04d');
  city: string = 'rome';
  constructor(private weatherSvc: WeatherService) {}

  ngOnInit() {
    this.weatherSvc.getCoordinates(this.city).subscribe((data) => {
      console.log(data);
      this.data = this.weatherSvc.filterData(data);
    });
  }
  searchCity() {
    if (this.city.length > 0) {
      this.weatherSvc.getCoordinates(this.city).subscribe((data) => {
        console.log(data);
        this.data = this.weatherSvc.filterData(data);
      });
    }
  }
}
