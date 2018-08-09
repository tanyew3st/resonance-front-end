import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  server = 'http://resonance.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  createDistrict(district) {
    return this.http.post(this.server + '/api/district', district);
  }

  getUsernames() {
    return this.http.get( this.server + '/api/district/usernames');
  }


  getAllInstruments(id) {
    return this.http.get( this.server + '/api/school/' + '/' + id + '/instruments', id);
  }

  getDistrict() {
    return this.http.get( this.server + '/api/district');
  }

  getAllSchools(id) {
    return this.http.get( this.server + '/api/school/district/' + id);
  }

  getContentsOfSchool(id) {
    return this.http.get( this.server + '/api/school/' + id);
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get( this.server + '/api/faculty/get/' + schoolId);
  }

  getRenter(id) {
    return this.http.get( this.server + '/api/renter/' + id);
  }

  updateDistrict(id, district) {
    return this.http.put(this.server + '/api/district/' + id, district);
  }
}
