import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
	selector: 'app-edit-delete-movie',
	templateUrl: './edit-delete-movie.component.html',
	styleUrls: ['./edit-delete-movie.component.scss']
})
export class EditDeleteMovieComponent implements OnInit, OnDestroy {
	public editMovieForm: FormGroup;
	private subscriptions: Subscription = new Subscription();
	public movie: Movie;
	public loading: boolean;
	public formHasChanges: boolean;

	constructor(private fb: FormBuilder,
		private route: ActivatedRoute,
		private moviesService: MoviesService,
		private router: Router,
		private dialogRef: MatDialog) { }

	ngOnInit(): void {
		this.loading = true;
		this.getMovie();
	}

	private getMovie(): void {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.subscriptions.add(
			this.moviesService.getMovie(id).subscribe((movie: Movie) => {
				this.movie = movie;
				this.editMovieForm = this.fb.group({
					country: new FormControl(this.movie.country, Validators.required),
					director: new FormControl(this.movie.director, Validators.required),
					duration: new FormControl(this.movie.duration, Validators.required),
					genre: new FormControl(this.movie.genre, Validators.required),
					image: new FormControl(this.movie.image, Validators.required),
					price: new FormControl(this.movie.price, Validators.required),
					synopsis: new FormControl(this.movie.synopsis, Validators.required),
					title: new FormControl(this.movie.title, Validators.required),
					year: new FormControl(this.movie.year, Validators.required),
				});
				this.loading = false;
				this.onFormValueChange();
			})
		);
	}

	get country(): AbstractControl | null {
		return this.editMovieForm.get('country');
	}

	get director(): AbstractControl | null {
		return this.editMovieForm.get('director');
	}

	get duration(): AbstractControl | null {
		return this.editMovieForm.get('duration');
	}

	get genre(): AbstractControl | null {
		return this.editMovieForm.get('genre');
	}

	get image(): AbstractControl | null {
		return this.editMovieForm.get('image');
	}

	get price(): AbstractControl | null {
		return this.editMovieForm.get('price');
	}

	get synopsis(): AbstractControl | null {
		return this.editMovieForm.get('synopsis');
	}

	get title(): AbstractControl | null {
		return this.editMovieForm.get('title');
	}

	get year(): AbstractControl | null {
		return this.editMovieForm.get('year');
	}

	public onSubmit(): void {
		this.loading = true;
		const genre = this.editMovieForm.value.genre.includes(',') ? this.editMovieForm.value.genre.split(',') : [this.editMovieForm.value.genre];
		const movieEdited: Movie = {
			country: this.country?.value,
			director: this.director?.value,
			duration: this.duration?.value,
			genre: genre,
			image: this.image?.value,
			price: this.price?.value,
			synopsis: this.synopsis?.value,
			title: this.title?.value,
			year: this.year?.value
		};
		this.subscriptions.add(
			this.moviesService.editMovie(this.movie.id ?? '', movieEdited).subscribe(() => {
				this.editMovieForm.markAsPristine();
				this.loading = false;
				const dialogRef = this.dialogRef.open(ConfirmationModalComponent, {
					width: '250px',
					data: { message: 'Changes Saved Successfully!' }
				});
				dialogRef.afterClosed().subscribe(() => {
					this.router.routeReuseStrategy.shouldReuseRoute = () => false;
					this.router.onSameUrlNavigation = 'reload';
					this.router.navigate([`/admin/edit-movie/${this.movie.id}`]);
				});
			})
		);
	}

	public onFormValueChange(): void {
		const initialValue = this.editMovieForm.value;
		this.subscriptions.add(
			this.editMovieForm.valueChanges.subscribe(() => {
				this.formHasChanges = Object.keys(initialValue).some(key => this.editMovieForm.value[key] !== initialValue[key])
			})
		);
	}

	public deleteMovie(): void {
		this.loading = true;
		this.subscriptions.add(
			this.moviesService.deleteMovie(this.movie.id ?? '').subscribe(() => {
				this.loading = false;
				this.router.navigate(['client/movies-list']);
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
