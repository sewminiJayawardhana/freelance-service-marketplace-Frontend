import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // ඔයාගේ Backend URL එක

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    // Backend එකේ register API එකට දත්ත යවනවා
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }

  login(credentials: any): Observable<any> {
    // Backend එකේ login API එකට දත්ත යවනවා
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' });
  }
}
