import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private user: User = {
    email: '',
    moviesInCart: [],
    rentedMovies: [
      {
        country: 'Ireland',
        director: 'Nathalie Biancheri',
        duration: '98 min',
        genre: ['Thriller', 'Drama', 'Romance'],
        id: 7,
        image: 'assets/images/wolf.jpg',
        price: 51,
        synopsis: "Jacob, a man who believes he is a wolf trapped in a human body, is sent to a clinic by his family where he is forced to undergo increasingly extreme forms of 'curative' therapies at the hands of The Zookeeper. Jacob's only solace is the enigmatic wildcat with whom he roams the hospital in the dead of night. The two form an improbable friendship that develops into infatuation.",
        title: 'Wolf',
        year: 2021
      },
      {
        country: 'United States',
        director: 'Orson Welles',
        duration: '119 min',
        genre: ['Journalism', 'Drama'],
        id: 8,
        image: 'assets/images/citizen-kane.jpg',
        price: 51,
        synopsis: "The story charts the rise and fall of a newpaper publisher whose wealth and power ultimately isolate him in his castle-like refuge. The last word he utters before his death is 'Rosebud', which triggers a mystery. A group of journalists start investigating in order to solve it.",
        title: 'Citizen Kane',
        year: 1941
      }
    ]
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // Hardcoded user, this will be deleted in the future
    this.userService.setUser(this.user);
  }

  hasRoute(routes: string[]): boolean {
    return !!routes.find(route => route === this.router.url);
  }
}
