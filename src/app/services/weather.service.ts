import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Weather } from '../weather.model';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  baseurl = 'https://api.open-meteo.com/v1/forecast?'
  api = encodeURI("&hourly=relativehumidity_2m")+ encodeURI("&hourly=temperature_2m") + encodeURI("&hourly=windspeed_120m") + encodeURI("&hourly=cloudcover_mid")
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }
  constructor(private http: HttpClient) { }

  getWeatherForecast(latitude: any, longitude: any): Observable<Weather> {
    console.log(this.api)
    return this.http.get<Weather>(this.baseurl + 'latitude=' +latitude + '&longitude=' +longitude + this.api
    ).pipe(map(result => result),
    
    catchError(this.errorHandler)

    )
 
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
