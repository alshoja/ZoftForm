import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Validation from './utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [
      '',
      [
        Validators.required,
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
      ]
    ],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });

  constructor(private fb: FormBuilder, private readonly authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.register(this.form.value).subscribe({
      next: (post) => {
        this.router.navigateByUrl('register/success');
      },
      error: (err) => { console.error(err) }
    });
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
