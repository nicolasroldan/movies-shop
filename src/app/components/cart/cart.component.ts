import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { User } from 'src/app/models/User';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public user: User;
  public loading: boolean;
  private totalMoviesInCart: number;
  private userId: string;
  private subscriptions: Subscription = new Subscription();

  constructor(private userService: UserService, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.add(
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
        this.userId = this.user.id ?? '';
        this.loading = false;
        this.totalMoviesInCart = user.moviesInCart.length;
      })
    );
  }

  public calculateTotalPrice(): number {
    return this.user.moviesInCart.map(movie => movie.price).reduce((a, b) => a + b, 0);
  }

  public deleteMovieFromCart(movieToDelete: Movie) {
    const indexOfMovieToRemove = this.user.moviesInCart.indexOf(movieToDelete);
    this.subscriptions.add(
      this.moviesService.deleteMovieFromCart(this.userId, movieToDelete.id ?? '').subscribe(() => {
        this.user.moviesInCart.splice(indexOfMovieToRemove, 1);
      })
    );
  }

  private addMovieToRentedList(movie: Movie, index: number): void {
    this.subscriptions.add(
      this.moviesService.addMovieToRentedList(this.userId, movie).subscribe(() => {
        this.user.rentedMovies.push(movie);
        this.loading = this.totalMoviesInCart === index + 1 ? false : true;
      })
    );
  }

  public confirmBuyMovies(): void {
    this.loading = true;
    this.user.moviesInCart.forEach((movie: Movie, index: number) => this.buyMovie(movie, index));
    this.user.moviesInCart = [];
  }

  private buyMovie(movie: Movie, index: number): void {
    this.deleteMovieFromCart(movie);
    this.addMovieToRentedList(movie, index);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
