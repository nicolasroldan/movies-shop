import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { User } from 'src/app/models/User';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { UserService } from 'src/app/shared/services/user.service';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
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
    userServiceSpy = jasmine.createSpyObj('MoviesService', ['getUsers']);
    userServiceSpy.getUsers = jasmine.createSpy().and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      declarations: [
        InfoComponent,
        SpinnerComponent
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.users).toEqual(mockUsers);
    expect(component.totalPriceRentedMovies).toEqual(102);
  });

  it('should calculate one user rented movies price', () => {
    expect(component.calculateUserRentedMoviesPrice(mockUsers[0])).toEqual(102);
  });

  it('should calculate all the users rented movies price', () => {
    expect(component.calculateTotalUsersRentedMoviesPrice(mockUsers)).toEqual(102);
  });
});
