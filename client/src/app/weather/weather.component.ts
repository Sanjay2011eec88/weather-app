import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public cities :Object;
  selectedCity: number = null;
  numberOfCity: number = 0;
  public weatherData: Object=null;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCityList();
  }

  getCityList(){
    this.weatherService.getCityList().subscribe(cities => {
      
      this.cities = cities['cityList'];
      this.numberOfCity = cities['cityList'].length;
      console.log("w", this.numberOfCity)
    })
  }

  selectCity(event:any){
    this.selectedCity = event.target.value;
    console.log(this.selectedCity)
  }

  getWeather(event: Event){
    var body = {
      "zipcode" : [this.selectedCity]
    }
    this.weatherService.getWeatherData(body).subscribe(weatherData => {

      this.weatherData = weatherData[0][this.selectedCity];
      console.log(this.weatherData);
    })
  }

  getWindDirection(d){
    if (typeof d !== 'number' || isNaN(d)) {
      return -1;
    }
  
    // keep within the range: 0 <= d < 360
    d = d % 360;
  
    if (11.25 <= d && d < 33.75) {
      return "NNE";
    } else if (33.75 <= d && d < 56.25) {
      return "NE";
    } else if (56.25 <= d && d < 78.75) {
      return "ENE";
    } else if (78.75 <= d && d < 101.25) {
      return "E";
    } else if (101.25 <= d && d < 123.75) {
      return "ESE";
    } else if (123.75 <= d && d < 146.25) {
      return "SE";
    } else if (146.25 <= d && d < 168.75) {
      return "SSE";
    } else if (168.75 <= d && d < 191.25) {
      return "S";
    } else if (191.25 <= d && d < 213.75) {
      return "SSW";
    } else if (213.75 <= d && d < 236.25) {
      return "SW";
    } else if (236.25 <= d && d < 258.75) {
      return "WSW";
    } else if (258.75 <= d && d < 281.25) {
      return "W";
    } else if (281.25 <= d && d < 303.75) {
      return "WNW";
    } else if (303.75 <= d && d < 326.25) {
      return "NW";
    } else if (326.25 <= d && d < 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  }

  formatDate(timestamp){
    var date = new Date(timestamp*1000)
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2); 
    return `${year}-${month}-${day}`
  }
}
