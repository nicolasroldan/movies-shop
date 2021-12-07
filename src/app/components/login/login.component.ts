import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  public showPassword: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

  onTogglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordInput.nativeElement.type = this.passwordInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    this.router.navigate(['dashboard']);
  }
}
