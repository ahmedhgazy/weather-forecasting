import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appWeatherTempIcon]',
  standalone: true,
})
export class WeatherTempIconDirective implements OnInit {
  constructor(private el: ElementRef) {}
  @Input('appWeatherTempIcon') temperature = 0;

  ngOnInit(): void {
    this.setTempIcon();
  }
  // changes the background depends on the temp value (!not needed as I used weather Icons instead)
  private setTempIcon() {
    if (this.temperature < 10) {
      this.el.nativeElement.style.backgroundColor = 'blue';
    } else if (this.temperature >= 10 && this.temperature <= 25) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }
}
