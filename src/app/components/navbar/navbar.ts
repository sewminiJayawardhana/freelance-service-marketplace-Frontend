import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}

  // යූසර් ලොග් වෙලාද කියලා බලනවා (Token එකක් තියෙනවාද කියලා බලනවා)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout වෙන හැටි
  onLogout() {
    localStorage.removeItem('token'); // Token එක අයින් කරනවා
    this.router.navigate(['/login']); // Login එකට යවනවා
  }
}
