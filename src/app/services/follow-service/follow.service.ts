import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  findAllRentals(key) {
    return this.http.get('/api/log/' + key);
  }

  getRenter(id) {
    return this.http.get('/api/renter/' + id);
  }

  getSchool(id) {
    return this.http.get( '/api/school/' + id);
  }

  getDonorLog(key) {
    return this.http.get('/api/log/donor/' + key);
  }
}
