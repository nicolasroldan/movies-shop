import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/shared/services/movies.service';

import { AddMovieComponent } from './add-movie.component';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['addMovie']);
    moviesServiceSpy.addMovie = jasmine.createSpy().and.returnValue(of({}));
    await TestBed.configureTestingModule({
      declarations: [ AddMovieComponent ],
      providers: [
        FormBuilder,
        { provide: MoviesService, useValue: moviesServiceSpy }
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a movie to add', () => {
    component.addMovieForm.controls.country.setValue('Denmark');
    component.addMovieForm.controls.director.setValue('Jonas Poher Rasmussen');
    component.addMovieForm.controls.duration.setValue('90 min');
    component.addMovieForm.controls.genre.setValue("Documentary,Animation");
    component.addMovieForm.controls.image.setValue('assets/images/flee.jpg');
    component.addMovieForm.controls.price.setValue(51);
    component.addMovieForm.controls.synopsis.setValue('An Afghan refugee agrees to tell a remarkable personal narrative of persecution and escape on the condition that his identity not be revealed. As a means of fulfilling that wish, his filmmaker friend uses striking animation to not only protect this young man but also enhance his tale, bending time and memory to recount a visceral, poetic, and death-defying journey dictated by deception, loneliness, and a relentless will to survive.');
    component.addMovieForm.controls.title.setValue('Flee');
    component.addMovieForm.controls.year.setValue('2021');

    const movie: Movie = {
      country: component.country?.value,
      director: component.director?.value,
      duration: component.duration?.value,
      genre: ['Documentary', 'Animation'],
      image: component.image?.value,
      price: component.price?.value,
      synopsis: component.synopsis?.value,
      title: component.title?.value,
      year: component.year?.value
    }
    component.onSubmit();
    expect(component['moviesService'].addMovie).toHaveBeenCalledWith(movie);
    expect(component.formSubmitted).toBeTruthy();
  });
});
