import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template:
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrl: './loading-spinner.component.scss',
  standalone: true,
})
export class LoadingSpinner implements OnInit {
  constructor() {}

  ngOnInit() {}
}
