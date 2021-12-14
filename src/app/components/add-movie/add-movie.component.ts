import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public addMovieForm: FormGroup;
  public messageString: string;
  public formSubmitted: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.addMovieForm = this.fb.group({
      country: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      synopsis: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
    });
    this.loading = false;
  }

  get country(): AbstractControl | null {
    return this.addMovieForm.get('country');
  }

  get director(): AbstractControl | null {
    return this.addMovieForm.get('director');
  }

  get duration(): AbstractControl | null {
    return this.addMovieForm.get('duration');
  }

  get genre(): AbstractControl | null {
    return this.addMovieForm.get('genre');
  }

  get image(): AbstractControl | null {
    return this.addMovieForm.get('image');
  }

  get price(): AbstractControl | null {
    return this.addMovieForm.get('price');
  }

  get synopsis(): AbstractControl | null {
    return this.addMovieForm.get('synopsis');
  }

  get title(): AbstractControl | null {
    return this.addMovieForm.get('title');
  }

  get year(): AbstractControl | null {
    return this.addMovieForm.get('year');
  }

  public onSubmit(): void {
    this.loading = true;
    const genre = this.addMovieForm.value.genre.includes(',') ? this.addMovieForm.value.genre.split(',') : [this.addMovieForm.value.genre];
    const movie: Movie = {
      country: this.country?.value,
      director: this.director?.value,
      duration: this.duration?.value,
      genre: genre,
      image: this.image?.value,
      price: this.price?.value,
      synopsis: this.synopsis?.value,
      title: this.title?.value,
      year: this.year?.value
    }
    this.subscriptions.add(
      this.moviesService.addMovie(movie).subscribe(() => {
        this.addMovieForm.reset();
        this.formSubmitted = true;
        this.messageString = 'Movie Added Successfully!';
        this.loading = false;
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
