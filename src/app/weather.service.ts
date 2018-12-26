import { City } from './model/city.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

   citiesUrl = 'http://www.weaterapi.somee.com/Cities/getCitiesList';
   recordUrl = 'http://www.weaterapi.somee.com/Cities/getCityWeatherRecord';

  constructor(private _http: HttpClient ) { }

  weatherForcast(cityId: string, beginDate: string, endDate: string) {
    console.log(this.recordUrl + '?' + 'ID=' + cityId
    + '&BeginDate='
    + beginDate
    + '&EndDate='
    + endDate);
    return this._http
      .get(this.recordUrl + '?' + 'ID=' + cityId
      + '&BeginDate ='
      + beginDate
      + '&EndDate='
      + endDate);
    }

    getCities() {
        return this._http
        .get(this.citiesUrl);
     }


}
