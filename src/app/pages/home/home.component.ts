import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { RouterModule } from '@angular/router';
import { WeatherDetailsComponent } from '../../components/weather-details/weather-details.component';
import { Subject, takeUntil } from 'rxjs';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchBarComponent,
    WeatherDetailsComponent,
    FooterComponent,
    RouterModule,
    LoadingSpinner,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  weatherS: WeatherService = inject(WeatherService);
  weatherData: Weather;
  tomorrowData: Weather;
  futureDate: string;
  endSubs$: Subject<any> = new Subject();
  isLoading = false;
  error = null;
  ngOnInit(): void {
    this.futureDate = this.getFutureDateInYYYYMMDD(15);
    this.getDefaultWeatherForecasting();
    this.getDefaultFutureWeather();
  }

  //[default] today's (current) weather (without searching )
  getDefaultWeatherForecasting() {
    this.weatherS
      .getForecasts()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((data) => {
        this.isLoading = false;
        this.weatherData = data;
      });
  }
  //[default] tomorrow's weather (without searching )
  getDefaultFutureWeather() {
    this.weatherS
      .getTomorrowW(this.futureDate)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((data) => {
        this.tomorrowData = data;
      });
  }
  // [Search]  called whenever a searchEvent triggered
  getWeatherForecasting(searchWord: string) {
    this.getTodaysW(searchWord);
    this.getTomorrowW(searchWord, this.futureDate);
  }

  // current
  getTodaysW(searchWord) {
    this.isLoading = true;

    this.weatherS
      .getForecasts(searchWord)
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.weatherData = data;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error;
          this.weatherS.error.next(error);
        },
      });
  }

  // future
  getTomorrowW(date, searchWord) {
    this.weatherS
      .getTomorrowW(searchWord, date)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((data: Weather) => {
        this.tomorrowData = data;
      });
  }

  // configure date format to match the api schema
  public getFutureDateInYYYYMMDD(daysInFuture: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysInFuture); // Set the date to the future
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // end subscriptions after component destruction
  ngOnDestroy() {
    this.endSubs$.next(() => {});
    this.endSubs$.complete();
  }
}
