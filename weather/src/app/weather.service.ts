import { IWeatherResp } from './interfaces/iweather-resp';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { Data } from './class/data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiKey = '45bd672530a82ded87cb68841aa1c214';
  data: Data = new Data('', 0, '', 0, 0, '');

  getCoordinates(city: string): Observable<IWeatherResp> {
    return this.http.get<IWeatherResp>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  filterData(data: IWeatherResp) {
    let newData = new Data(
      data.name,
      data.main.temp,
      data.weather[0].description,
      data.wind.speed,
      data.main.humidity,
      data.weather[0].icon
    );

    return newData;
  }

  constructor(private http: HttpClient) {}
}
