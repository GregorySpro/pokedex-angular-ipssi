import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router);

  estPageDetail = signal(this.router.url.startsWith('/pokemon/'));

  constructor() {
    this.router.events.subscribe((evenement) => {
      if (evenement instanceof NavigationEnd) {
        this.estPageDetail.set(evenement.urlAfterRedirects.startsWith('/pokemon/'));
      }
    });
  }
}
