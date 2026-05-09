import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job';
import { FormsModule } from '@angular/forms';

// Bootstrap භාවිතා කිරීමට අවශ්‍යයි
declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  jobs: any[] = [];
  loggedInUser: any = null;

  selectedJob: any = null;

  newJob = {
    title: '',
    category: 'Web Development',
    budget: null,
    description: '',
    user: { id: null as any }
  };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('currentUser');
    console.log("Raw JSON from Storage:", userJson); // මේක පේනවාද බලන්න

    if (userJson) {
      this.loggedInUser = JSON.parse(userJson);
      console.log("Parsed User Object:", this.loggedInUser);
      console.log("User Role:", this.loggedInUser?.role); // මෙතන 'CLIENT' ද තියෙන්නේ?

      if (this.loggedInUser?.id) {
        this.newJob.user.id = this.loggedInUser.id;
      }
    }
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error("Load jobs error:", err)
    });
  }

  onPostJob() {
    // Session පරීක්ෂා කිරීම
    if (!this.newJob.user.id) {
      alert("Error: User session expired. Please login again.");
      return;
    }

    this.jobService.createJob(this.newJob).subscribe({
      next: (res) => {
        alert("Job Posted Successfully!");

        // Modal එක TypeScript හරහා වසා දැමීම
        const modalElement = document.getElementById('jobModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
          modalInstance.hide();
        }

        this.loadJobs();
        this.resetForm();
      },
      error: (err) => {
        console.error("Error details:", err);
        alert("Failed to post job. Please check console.");
      }
    });
  }

  // Function to set the selected job when "View Details" is clicked
  viewJobDetails(job: any) {
    this.selectedJob = job;
    console.log("Viewing Job:", this.selectedJob);
  }

// Placeholder for future Application logic
  applyForJob() {
    if (this.selectedJob) {
      alert(`Application started for: ${this.selectedJob.title}`);
      // Next step: Implement an Application modal or API call
    }
  }

  private resetForm() {
    this.newJob = {
      title: '',
      category: 'Web Development',
      budget: null,
      description: '',
      user: { id: this.loggedInUser?.id || null }
    };
  }
}
