import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job';
import { FormsModule } from '@angular/forms';

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

  // UI Control
  showApplyForm: boolean = false;

  newJob = {
    title: '',
    category: 'Web Development',
    budget: null,
    description: '',
    user: { id: null as any }
  };

  applyForm = { coverLetter: '' };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.loggedInUser = JSON.parse(userJson);
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

  viewJobDetails(job: any) {
    this.selectedJob = job;
    this.showApplyForm = false; // Reset form view when opening a new job
    this.applyForm.coverLetter = '';
  }

  toggleApplyForm() {
    this.showApplyForm = !this.showApplyForm;
  }

  onApply() {
    if (!this.applyForm.coverLetter.trim()) {
      alert("Please write a cover letter first!");
      return;
    }

    const payload = {
      jobId: this.selectedJob.id,
      freelancerId: this.loggedInUser.id,
      coverLetter: this.applyForm.coverLetter
    };

    this.jobService.applyToJob(payload).subscribe({
      next: (res) => {
        alert("Application sent successfully!");
        this.showApplyForm = false;
        this.applyForm.coverLetter = '';

        // Close Modal
        const modalElement = document.getElementById('viewJobModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      },
      error: (err) => {
        // Backend එකෙන් "Already applied" වැනි message එකක් එනවා නම් එය පෙන්වයි
        alert(err.error || "Failed to submit application.");
      }
    });
  }

  onPostJob() {
    if (!this.newJob.user.id) {
      alert("Error: User session expired. Please login again.");
      return;
    }

    this.jobService.createJob(this.newJob).subscribe({
      next: (res) => {
        alert("Job Posted Successfully!");
        const modalElement = document.getElementById('jobModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
        this.loadJobs();
        this.resetForm();
      },
      error: (err) => alert("Failed to post job.")
    });
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
