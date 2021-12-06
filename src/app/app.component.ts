import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-shop';

  constructor(private router: Router) {

  }

  hasRoute(routes: string[]): boolean {
   return !!routes.find(route => route === this.router.url);
  }
}
