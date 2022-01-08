import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { UserService } from 'src/app/shared/services/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;


  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('MoviesService', ['createUser']);
    userServiceSpy.createUser = jasmine.createSpy().and.returnValue(of({}));


    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component['router'].navigate = jasmine.createSpy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login', () => {
    component.goToLogin();
    expect(component['router'].navigate).toHaveBeenCalledWith(['auth']);
  });

  it('should toggle show password', () => {
    component.showPassword = false;
    component.passwordInput = new ElementRef({})
    component.onTogglePassword();
    expect(component.showPassword).toBeTruthy();
  });

  it('should submit a registered user', () => {
    component.onSubmit();
    expect(component['router'].navigate).toHaveBeenCalledWith(['auth']);
  });
});
