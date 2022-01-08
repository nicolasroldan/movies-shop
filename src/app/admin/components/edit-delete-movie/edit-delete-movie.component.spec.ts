import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ClientRoutingModule } from 'src/app/client/client-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { Movie } from 'src/app/models/Movie';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { MoviesService } from 'src/app/shared/services/movies.service';

import { EditDeleteMovieComponent } from './edit-delete-movie.component';

describe('EditDeleteMovieComponent', () => {
  let component: EditDeleteMovieComponent;
  let fixture: ComponentFixture<EditDeleteMovieComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  
  const mockMovie: Movie = {
    country: 'Denmark',
    director: 'Jonas Poher Rasmussen',
    duration: '90 min',
    genre: ['Documentary', 'Animation'],
    image: 'assets/images/flee.jpg',
    price: 51,
    synopsis: 'An Afghan refugee agrees to tell a remarkable personal narrative of persecution and escape on the condition that his identity not be revealed. As a means of fulfilling that wish, his filmmaker friend uses striking animation to not only protect this young man but also enhance his tale, bending time and memory to recount a visceral, poetic, and death-defying journey dictated by deception, loneliness, and a relentless will to survive.',
    title: 'Flee',
    year: 2021
  }

  beforeEach(async () => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovie', 'editMovie', 'deleteMovie']);
    moviesServiceSpy.getMovie = jasmine.createSpy().and.returnValue(of(mockMovie));
    moviesServiceSpy.editMovie = jasmine.createSpy().and.returnValue(of({}));
    moviesServiceSpy.deleteMovie = jasmine.createSpy().and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [
        EditDeleteMovieComponent,
        SpinnerComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ClientRoutingModule
      ],
      providers: [
        FormBuilder,
        { provide: MoviesService, useValue: moviesServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a movie', () => {
    component.onFormValueChange = jasmine.createSpy();
    component.ngOnInit();
    expect(component.movie).toEqual(mockMovie);
    expect(component.onFormValueChange).toHaveBeenCalled();
  });

  it('should edit a movie', () => {
    component.onSubmit();
    expect(component['moviesService'].editMovie).toHaveBeenCalled();
  });

  it('should edit a movie', () => {
    component.editMovieForm.controls.genre.setValue('Documentary , Animation');
    component.onSubmit();
    expect(component['moviesService'].editMovie).toHaveBeenCalled();
  });

  it('should detect that the form has changes', () => {
    component.editMovieForm.controls.country.setValue('');
    component.onFormValueChange();
    expect(component.formHasChanges).toEqual(true);
  });

  it('should delete a movie', () => {
    component['router'].navigate = jasmine.createSpy();
    component.deleteMovie();
    expect(component['moviesService'].deleteMovie).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['client/movies-list']);
  });
});
