import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'weather-forecasting';
  usersList = ['Ahmed', 'Mohamed', 'Mahmoud', 'Hgazy'];
  getListOfUsers() {
    return this.usersList.slice();
  }

  ngOnInit(): void {
    console.log('Hello ');
  }
}
