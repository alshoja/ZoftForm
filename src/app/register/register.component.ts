import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.form.invalid)
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
