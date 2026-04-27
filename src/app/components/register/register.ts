import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = {
    username: '',
    email: '',
    password: '',
    role: 'FREELANCER',
    bio: ''
  };

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (response: any) => {
        alert(response); // "User registered successfully!" කියලා එයි
      },
      error: (err: any) => {
        console.error(err);
        alert("Registration failed!");
      }
    });
  }
}
