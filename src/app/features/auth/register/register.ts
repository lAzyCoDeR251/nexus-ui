import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router   // 👈 add this
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.http.post('http://localhost:8000/auth/register/', this.registerForm.value)
      .subscribe({
        next: (res) => {
          console.log('REGISTER SUCCESS:', res);

          // 👇 navigate to login page
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('REGISTER ERROR:', err);
        }
      });
  }
}
