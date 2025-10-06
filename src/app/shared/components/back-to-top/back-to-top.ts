import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  imports: [
  ],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss'
})
export class BackToTop {
  showButton = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showButton = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
