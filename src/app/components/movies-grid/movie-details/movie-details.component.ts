import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { User } from 'src/app/models/User';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public movie: Movie;
  public user: User;
  public isMovieInCart: boolean = false;
  public isMovieRented: boolean = false;
  private subscriptions: Subscription = new Subscription();
  public messageString: string;
  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUser();
  }

  private getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.subscriptions.add(
      this.moviesService.getMovie(id).subscribe((movie: Movie) => {
        this.movie = movie;
        this.loading = false;
        this.isMovieInCart = this.user.moviesInCart.find(movie => movie.title === this.movie.title) ? true : false;
        this.isMovieRented = this.user.rentedMovies.find(movie => movie.title === this.movie.title) ? true : false;
        this.messageString = this.isMovieInCart ? 'Movie already in Cart' : this.isMovieRented ? 'Movie already Rented' : '';
      })
    );
  }

  public addMovieToCart(movie: Movie): void {
    this.subscriptions.add(
      this.moviesService.addMovieToCart(this.userId, movie).subscribe(() => this.router.navigate(['client/cart']))
    );
  }

  private getUser(): void {
    this.subscriptions.add(
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
        this.userId = user.id ?? '';
        this.getMovie();
      })
    );
  }

  public goToEditMovie(movie: Movie): void {
    this.router.navigate([`admin/edit-movie/${movie.id}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
