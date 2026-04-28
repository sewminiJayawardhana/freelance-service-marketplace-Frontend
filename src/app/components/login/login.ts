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
      next: (token: string) => {
        // Token එක browser එකේ save කරගන්නවා
        localStorage.setItem('token', token);
        alert("Login Successful!");
        // සාර්ථකව login වුණාම අපිව dashboard එකට යවන්න පුළුවන් (දැනට අපි නිකම්ම dashboard එකට route කරමු)
        this.router.navigate(['/dashboard']);
      },
      error: (err:any) => {
        alert("Login Failed! Please check credentials.");
      }
    });
  }
}
