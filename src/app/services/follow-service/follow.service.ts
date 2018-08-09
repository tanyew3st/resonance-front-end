import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  server = 'http://resonance.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  findAllRentals(key) {
    return this.http.get(this.server + '/api/log/' + key);
  }

  getRenter(id) {
    return this.http.get(this.server + '/api/renter/' + id);
  }

  getSchool(id) {
    return this.http.get(this.server + '/api/school/' + id);
  }

  getDonorLog(key) {
    return this.http.get(this.server + '/api/log/donor/' + key);
  }
}
