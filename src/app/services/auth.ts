import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    // Register එකට තවමත් text response එකක් ලැබෙන නිසා මෙය එලෙසම තබන්න
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }

  login(credentials: any): Observable<any> {

    // දැන් Backend එකෙන් AuthResponse JSON එකක් ලැබෙන නිසා <any> ලෙස භාවිතා කරන්න
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
