import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      // දැන් මෙතැනට (token: string) වෙනුවට (response: any) ලැබෙනවා
      next: (response: any) => {
        console.log("Login Response Received:", response);

        // 1. Save the token
        localStorage.setItem('token', response.token);

        // 2. මුළු User Object එකම (id, role, username සහිතව) save කරනවා
        // Dashboard එකේ button එක පෙන්වීමට මෙය අනිවාර්යයි
        localStorage.setItem('currentUser', JSON.stringify(response));

        alert("Login Successful!");

        // 3.Navigate to the dashboard after the successfully login
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error("Login failed error:", err);
        alert("Login Failed! Please check credentials.");
      }
    });
  }
}
