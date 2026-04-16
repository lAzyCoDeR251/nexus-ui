import { Routes } from '@angular/router';
import { PromptListComponent } from './features/prompts/prompt-list/prompt-list';
import { PromptDetailComponent } from './features/prompts/prompt-detail/prompt-detail';
import { PromptFormComponent } from './features/prompts/prompt-form/prompt-form';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'prompts', component: PromptListComponent },
  { path: 'prompts/:id', component: PromptDetailComponent },
  { path: 'create', component: PromptFormComponent },
];
