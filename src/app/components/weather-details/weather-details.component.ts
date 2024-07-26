import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss',
})
export class WeatherDetailsComponent implements OnInit {
  weatherS: WeatherService = inject(WeatherService);
  @Input() today: boolean;
  temperature = 26;
  unit: string = 'C';
  @Input() date;
  @Input() weather: Weather;
  constructor() {}
  ngOnInit(): void {}

  toggleUnit() {
    if (!this.weather) {
      return null;
    }
    this.unit === 'C' ? (this.unit = 'F') : (this.unit = 'C');
  }
}
