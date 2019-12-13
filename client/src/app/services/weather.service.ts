import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Http, Response, HttpModule} from "@angular/http";
import {map, catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityList(){
    return this.http.get('/weather/cityList',httpOptions).pipe(map(
      data => {
        return data;
      }
    ));
  }

  getWeatherData(zipcode){
    return this.http.post('/weather',zipcode, httpOptions).pipe(map(
      weatherData => {
        return weatherData;
      }
    ))
  }
}
