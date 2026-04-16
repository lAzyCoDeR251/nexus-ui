import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PromptService } from '../../../core/services/prompt.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-prompt-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './prompt-form.html',
})
export class PromptFormComponent implements OnInit {

  loading = false;
  errorMsg = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    this.promptService.createPrompt(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/prompts']);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Something went wrong';
        this.loading = false;
      }
    });
  }
}
