import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  @ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  public showPassword: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  onTogglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordInput.nativeElement.type = this.passwordInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {}
}
