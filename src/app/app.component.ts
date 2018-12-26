
import { Component, OnInit, NgModule } from '@angular/core';
import {WeatherService} from './weather.service';
import {Chart} from 'chart.js';
import {City} from './model/city.model';
import {Record} from './model/record.model';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   public cities$: City[];
   public records$: Record[];
   public citySelect: string;
   public mesureSelect: string;
   temperaturesShow: number[];
   temperaturesCeslcius: number[];
   temperaturesFahrenheit: number[];
   dates: string[];
   bsRangeValue: Date[];

  public LineChart: any = [];
  record: Record[] = [ {cityId: 1, date: '12/12/2018', temperature: 15}];

  constructor(private _weather: WeatherService) {}

    /*ngOnIniT(){
    this._weather.weatherForcast()
    .subscribe(res => {
    });*/

  ngOnInit() {
    this.mesureSelect = '1';
     this._weather.getCities()
          .subscribe(data => {
           this.cities$ = data['JsonArray'].map(res => res);
          //console.log(data);
            console.log(this.cities$);
          });
}

searchForcast() {
  console.log(this.bsRangeValue);
  console.log(this.bsRangeValue[0].toLocaleDateString());
  this._weather.weatherForcast(this.citySelect,
    this.bsRangeValue[0].toLocaleDateString(),
    this.bsRangeValue[1].toLocaleDateString())

      .subscribe(data => {
        console.log(data);
        this.records$ =  data['JsonArray'].map(res => res);
        this.temperaturesCeslcius = data['JsonArray'].map(res => res.temperature );
        this.temperaturesFahrenheit = data['JsonArray'].map(res => (res.temperature * 1.8) + 32);
        this.dates =  data['JsonArray'].map(res => res.date);
        console.log(this.temperaturesFahrenheit);
        this.fillChart();
      });
    }

  fillChart() {
    console.log(this.mesureSelect);
    this.temperaturesShow = [];
    if (this.mesureSelect === '2') {
      console.log('Mostrar far');
      this.temperaturesShow = this.temperaturesFahrenheit;
    } else {
      this.temperaturesShow = this.temperaturesCeslcius;
    }
    console.log(this.temperaturesShow );
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
      labels: this.dates,
      datasets: [{
          label: 'Number of Items Sold in Months',
          data: this.temperaturesShow,
          fill:false,
          lineTension:0.2,
          borderColor:"red",
          borderWidth: 1
      }]
      },
      options: {
      title:{
          text:"Line Chart",
          display:true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
      }
      });
  }

}
