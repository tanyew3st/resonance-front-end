import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }

  createDistrict(district) {
    return this.http.post('/api/district', district);
  }

  getUsernames() {
    return this.http.get('/api/district/usernames');
  }


  getAllInstruments(id) {
    return this.http.get('/api/school/' + '/' + id + '/instruments', id);
  }

  getDistrict() {
    return this.http.get('/api/district');
  }

  getAllSchools(id) {
    return this.http.get('/api/school/district/' + id);
  }

  getContentsOfSchool(id) {
    return this.http.get('/api/school/' + id);
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get('/api/faculty/get/' + schoolId);
  }

  getRenter(id) {
    return this.http.get('/api/renter/' + id);
  }

  updateDistrict(id, district) {
    return this.http.put('/api/district/' + id, district);
  }
}
