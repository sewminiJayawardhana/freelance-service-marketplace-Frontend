import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService{
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) { }

  // සියලුම Jobs ලබා ගැනීමට
  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // අලුත් Job එකක් ඇතුළත් කිරීමට
  createJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, jobData);
  }

  applyToJob(applicationData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }; // Attach the JWT token

    return this.http.post(
      `http://localhost:8080/api/applications/apply`,
      applicationData,
      { headers }
    );
  }
}


