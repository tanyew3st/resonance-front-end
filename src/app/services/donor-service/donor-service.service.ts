import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private url = '/api/donor';
  private url2 = '/api/instrument';

  server = 'http://resonance-2-spring.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  getDonor() {
    // return this.http.get(this.url);
    return new Observable();
  }

  getSchoolById(id) {
    return this.http.get(this.server + '/api/school/' + id);
  }

  createDonor(donor) {
    console.log(donor);
    console.log(JSON.stringify(donor));
    return this.http.post(this.server + this.url, (donor));
  }
  getSchools() {
    return this.http.get(this.server + '/api/school');
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get(this.server + '/api/faculty/get/' + schoolId);
  }



  getInstrument() {
    // return this.http.get(this.url2);
  }

  createInstrument(instrument) {
    console.log(instrument);
    console.log(JSON.stringify(instrument));
    return this.http.post(this.server + this.url2, (instrument));
  }

  sendId() {
    console.log(this.server + 'Well');
  }

  getSchoolInstruments(schoolId, instrument) {
    return this.http.get(this.server + '/api/type/get/' + schoolId + '/' + instrument);
  }

  // updateDonor(post) {
  //   return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }));
  // }

  // deleteDonor(id) {
  //   return this.http.delete(this.url + '/' + id);
  // }
}

