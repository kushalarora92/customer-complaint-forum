import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { ComplaintService } from '../../services/http/complaint/complaint.service';
import { IComplaint } from '../../interfaces/iComplaint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  isAgent: boolean;
  userData: any;
  complaints: IComplaint[];
  complaintDetails: IComplaint;
  selectedComplaint: IComplaint;
  addedCommentText: string;
  complaintForm: FormGroup;
  submitted = false;
  updatedStatus: string;

  constructor(
    private storage: StorageService,
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.isAgent = false;
    this.complaintDetails = null;
  }

  ngOnInit() {
    this.userData = this.storage.getItem('currentUser');
    if (!this.userData) { return; }
    this.isAgent = this.userData['acc_type'] === 'agent';

    this.complaintForm = this.formBuilder.group({
      heading: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.getComplaints();
  }

  get f() { return this.complaintForm.controls; }

  getComplaints() {
    if (this.isAgent) {
      this.complaintService.getAllComplaints().subscribe((complaints: IComplaint[]) => {
        this.complaints = complaints;
      });
    } else {
      this.complaintService.getComplaintsByUserId(this.userData._id).subscribe((complaints: IComplaint[]) => {
        this.complaints = complaints;
      });
    }
  }

  onViewComplaintClick(complaint: IComplaint) {
    this.selectedComplaint = complaint;
    this.updatedStatus = complaint.status;

    this.getComplaintDetails(complaint._id);
  }

  getComplaintDetails(id) {
    this.complaintService.getComplaintDetailsById(id).subscribe((complaint: IComplaint) => {
      this.selectedComplaint = complaint;
    });
  }

  onCommentAddition(text) {
    const comment = {
      created_by: this.userData._id,
      complaint_id: this.selectedComplaint._id,
      text
    };

    this.complaintService.addComment(comment).subscribe(response => {
      this.addedCommentText = '';
      this.getComplaintDetails(this.selectedComplaint._id);
    });
  }

  onComplaintFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.complaintForm.invalid) {
        return;
    }

    const complaint = {
      created_by: this.userData._id,
      heading: this.f.heading.value,
      description: this.f.description.value
    };

    this.complaintService.create(complaint)
      .subscribe(
          resp => {
            (<any>$('#newComplaintModal')).modal('toggle');
            this.getComplaints();
          },
          error => {
              this.alertService.error(error);
          });
  }

  onUpdateStatusClick(status) {
    this.complaintService.updateComplaintStatus(this.selectedComplaint._id, {
      status,
      date_updated: new Date()
    }).subscribe(resp => {
      (<any>$('#complaintDetailsModal')).modal('toggle');
      this.getComplaints();
    }, error => {
      this.alertService.error(error);
    });
  }
}
