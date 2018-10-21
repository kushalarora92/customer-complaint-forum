import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getAllComplaints() {
      return this.http.get(`${environment.apiBaseUrl}/complaint/getAllComplaints`);
  }

  getComplaintsByUserId(id: string) {
    return this.http.get(`${environment.apiBaseUrl}/complaint/getComplaintsByUserId/${id}`);
  }

  getComplaintsByIdWithComments(id: string) {
    return this.http.get(`${environment.apiBaseUrl}/complaint/getComplaintsByUserIdWithComments/${id}`);
  }

  create(complaint) {
    return this.http.post(`${environment.apiBaseUrl}/complaint/create`, complaint);
  }

  addComment(comment) {
    return this.http.post(`${environment.apiBaseUrl}/complaint/addComment`, comment);
  }

  getComplaintDetailsById(id: string) {
    return this.http.get(`${environment.apiBaseUrl}/complaint/getComplaintDetailsById/${id}`);
  }

  updateComplaintStatus(id: string, complaint) {
    return this.http.post(`${environment.apiBaseUrl}/complaint/updateStatusById/${id}`, complaint);
  }
}
