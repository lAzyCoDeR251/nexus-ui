import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PromptService } from '../../../core/services/prompt.service';
import { Prompt } from '../../../shared/models/prompt.model';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-detail.html',
})
export class PromptDetailComponent implements OnInit {
  prompt?: Prompt;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.promptService.getPrompt(id).subscribe({
      next: (data) => {
        console.log('API DATA DETAIL:', data);
        this.prompt = data;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
