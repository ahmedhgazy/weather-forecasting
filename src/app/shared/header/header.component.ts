import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userScroll();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userScroll();
    }
  }

  userScroll(): void {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('border-bottom', 'navbar-sticky');
      } else {
        navbar.classList.remove(
          'bg-primary',
          'border-bottom',
          'border-secondary',
          'navbar-sticky'
        );
      }
    }
  }
}
