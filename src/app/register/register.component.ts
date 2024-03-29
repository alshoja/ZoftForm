import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Validation from './utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public authSubscription!: Subscription;
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
  );

  constructor(private fb: FormBuilder, private readonly authService: AuthService, private router: Router) { }
  ngOnInit() {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authSubscription = this.authService.register(this.form.value).subscribe({
      next: (auth) => {
        console.log(JSON.stringify(this.form.value, null, 2));
        this.router.navigateByUrl('success');
      },
      error: (err) => { console.error(err) }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }
}
