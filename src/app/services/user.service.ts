import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor() { }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  addMovie(movie: Movie): void {
    this.user.moviesInCart.push(movie);
  }
}
