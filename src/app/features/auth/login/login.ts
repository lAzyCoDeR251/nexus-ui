import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.http.post('https://nexus-backend-zxne.onrender.com/auth/login/', this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('LOGIN SUCCESS:', res);

          localStorage.setItem('token', res.token);

          // ✅ redirect
          this.router.navigate(['/prompts']);
        },
        error: (err) => {
          console.error('LOGIN ERROR:', err);
        }
      });
  }
}
