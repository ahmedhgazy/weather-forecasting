import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvironmentVariables } from '../Environment/environment-variables';
import { Weather } from '../models/weather.model';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor() {}
  http: HttpClient = inject(HttpClient);
  error = new BehaviorSubject<string>(null);
  /*
  !to track changes in the component (not needed in this simple app)
  cityWeatherList = new BehaviorSubject<Weather | null>(null);
  */

  private API = EnvironmentVariables.baseURL;
  private API_key = '56ba28479dab485aad2215858242507';

  // current
  getForecasts(searchWord = 'cairo') {
    return this.http
      .get<Weather>(
        `${this.API}current.json?q=${searchWord}&key=${this.API_key}&aqi=no`
      )
      .pipe(catchError(this.handleErrors));
  }

  // future
  getTomorrowW(date: string, searchWord = 'cairo') {
    return this.http
      .get<Weather>(
        `${this.API}future.json?key=${this.API_key}&q=${searchWord}&dt=${date}`
      )
      .pipe(catchError(this.handleErrors));
  }
  private handleErrors(errorResponse: HttpErrorResponse) {
    let error = 'Something went wrong, please try again later';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }
    console.log(errorResponse.error.error.message);
    error = errorResponse.error.error.message;
    return throwError(error);
  }
}
