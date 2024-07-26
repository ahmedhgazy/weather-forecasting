import { CommonModule } from '@angular/common';
import {
  ElementRef,
  EventEmitter,
  inject,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchWord', { static: true }) searchWord: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();
  error = null;
  weatherS: WeatherService = inject(WeatherService);

  ngOnInit() {
    this.weatherS.error.subscribe((error) => {
      this.error = error;
      if (error) {
        setTimeout(() => {
          this.error = null;
          this.searchWord.nativeElement.value = '';
        }, 4000);
      }
    });
  }

  FireSearchEvent() {
    const searchWord = this.searchWord.nativeElement.value;
    if (!searchWord) {
      return;
    }
    this.searchEvent.emit(searchWord);
  }
}
