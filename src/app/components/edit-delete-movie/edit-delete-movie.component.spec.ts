import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteMovieComponent } from './edit-delete-movie.component';

describe('EditDeleteMovieComponent', () => {
  let component: EditDeleteMovieComponent;
  let fixture: ComponentFixture<EditDeleteMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteMovieComponent ]
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
});
