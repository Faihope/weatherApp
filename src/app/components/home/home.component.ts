import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchForm!: FormGroup;
  public weatherData: any;
  weather: Weather | undefined;
  constructor(private formBuilder:FormBuilder,private service:WeatherService) { }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      latitude:new FormControl('', [Validators.required]),
      longitude:new FormControl('', [Validators.required])
    });
   
  }


  onSubmit(formValues:any) {
    this.service.getWeatherForecast(formValues.latitude,formValues.longitude)
      .subscribe(res => {
        this.weatherData = res
        
        const date = new Date(this.weatherData.hourly.time).toLocaleTimeString();
        console.log(date)


       
      })
    
    
  
  }
 
}
