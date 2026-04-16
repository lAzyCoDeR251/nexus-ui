import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PromptService } from '../../../core/services/prompt.service';
import { Prompt } from '../../../shared/models/prompt.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-list.html', // keep your filename
})
export class PromptListComponent implements OnInit {
  prompts: Prompt[] = [];
  loading = true;

  constructor(
    private promptService: PromptService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.promptService.getPrompts().subscribe({
      next: (data) => {
        console.log('API DATA:', data);

        this.prompts = [...data]; // 🔥 important fix
        this.loading = false;

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  getColor(level: number): string {
    if (level <= 3) return 'bg-green-500';
    if (level <= 7) return 'bg-yellow-500';
    return 'bg-red-500';
  }
}
