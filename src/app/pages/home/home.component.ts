import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { WeatherDetailsComponent } from '../../components/weather-details/weather-details.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchBarComponent,
    WeatherDetailsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
