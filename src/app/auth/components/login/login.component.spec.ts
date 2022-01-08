import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/shared/services/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  const mockUsers: User[] = [
    {
      name: "ana",
      email: "ana@gmail.com",
      password: "aaaaaaaa",
      isAdmin: false,
      id: "2",
      moviesInCart: [
        {
          country: "Ireland",
          director: "Nathalie Biancheri",
          duration: "98 min",
          genre: [
            "Thriller",
            "Drama",
            "Romance"
          ],
          image: "assets/images/wolf.jpg",
          price: 51,
          synopsis: "Jacob, a man who believes he is a wolf trapped in a human body, is sent to a clinic by his family where he is forced to undergo increasingly extreme forms of 'curative' therapies at the hands of The Zookeeper. Jacob's only solace is the enigmatic wildcat with whom he roams the hospital in the dead of night. The two form an improbable friendship that develops into infatuation.",
          title: "Wolf",
          year: 2021,
          id: "2"
        },
        {
          country: "United States",
          director: "Lin-Manuel Miranda",
          duration: "115 min",
          genre: [
            "Musical",
            "Drama"
          ],
          image: "assets/images/tick-tick-boom.jpg",
          price: 51,
          synopsis: "Based on the autobiographical musical by playwright Jonathan Larson. It is the story of an aspiring composer in New York City who is worried he made the wrong career choice.",
          title: "tick, tick... Boom!",
          year: 2021,
          id: "3"
        }
      ],
      rentedMovies: [
        {
          country: "United States",
          director: "Chloé Zhao",
          duration: "156 min",
          genre: [
            "Action",
            "Science fiction",
            "Super Heroes"
          ],
          image: "assets/images/eternals.jpg",
          price: 51,
          synopsis: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
          title: "Eternals",
          year: 2021,
          id: "1",
        },
        {
          country: "United States",
          director: "Reinaldo Marcus Green",
          duration: "138 min",
          genre: [
            "Drama",
            "Biographical"
          ],
          image: "assets/images/king-richard.jpg",
          price: 51,
          synopsis: "Based on the true story, “King Richard follows the journey of Richard Williams, an undeterred father instrumental in raising two of the most extraordinarily gifted athletes of all time, who will end up changing the sport of tennis forever. Driven by a clear vision of their future and using unconventional methods, Richard has a plan that will take Venus and Serena Williams from the streets of Compton, California to the global stage as legendary icons.",
          title: "King Richard",
          year: 2021,
          id: "2",
        }
      ]
    }
  ];


  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('MoviesService', ['getUsers', 'setUser']);
    userServiceSpy.getUsers = jasmine.createSpy().and.returnValue(of(mockUsers));
    userServiceSpy.setUser = jasmine.createSpy().and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to register', () => {
    component['router'].navigate = jasmine.createSpy();
    component.goToRegister();
    expect(component['router'].navigate).toHaveBeenCalledWith(['auth/register']);
  });

  it('should toggle show password', () => {
    component.showPassword = false;
    component.passwordInput = new ElementRef({})
    component.onTogglePassword();
    expect(component.showPassword).toBeTruthy();
  });

  it('should submit the user log in', () => {
    component.loginForm.controls.email.setValue('ana@gmail.com');
    component.loginForm.controls.password.setValue('aaaaaaaa');
    component['router'].navigate = jasmine.createSpy();
    component.onSubmit();
    expect(component['router'].navigate).toHaveBeenCalledWith(['client/movies-list']);
  });
  afterEach(() => {
    localStorage.clear();
  });
});
