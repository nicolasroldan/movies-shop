import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-shop';
  showLoginSection: boolean = true;
  showRegisterSection: boolean = false;

  onToggleRegisterSetion(): void {
    this.showLoginSection = false;
    this.showRegisterSection = true;
  }

  onToggleRegisterSection(): void {
    this.showLoginSection = true;
    this.showRegisterSection = false;
  }
}
