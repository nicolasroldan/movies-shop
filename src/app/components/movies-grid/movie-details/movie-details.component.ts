import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  public movie: Movie;
  private user: User;
  public isMovieInCart: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    
    this.subscriptions.add(
      this.moviesService.getMovie(id).subscribe(movies => {
        this.movie = movies[0];
        this.isMovieInCart = this.user.moviesInCart.find(movie => movie.id === this.movie.id) ? true : false;
      })
    );
  }

  rentMovie(movie: Movie): void {
    this.userService.addMovie(movie);
    this.router.navigate(['cart']);
  }

  getUser(): void {
    this.user = this.userService.getUser();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
