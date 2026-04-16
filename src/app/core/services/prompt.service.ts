import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Prompt } from '../../shared/models/prompt.model';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  // private apiUrl = 'http://127.0.0.1:8000';
  private apiUrl = 'https://nexus-backend-zxne.onrender.com';

  constructor(private http: HttpClient) {}

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(`${this.apiUrl}/prompts/`)
      .pipe(catchError(this.handleError));
  }

  getPrompt(id: string): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiUrl}/prompts/${id}/`)
      .pipe(catchError(this.handleError));
  }

  createPrompt(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prompts/create/`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
