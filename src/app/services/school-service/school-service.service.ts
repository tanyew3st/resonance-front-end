import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  server = 'http://resonance.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  private url = '/api/school';

  getContentsOfDistrict(id) {
    return this.http.get(this.server + '/api/district/' + id);
  }

  deleteInstrument(id) {
    return this.http.delete(this.server + '/api/instrument/' + id);
  }
  getSchool() {
    return this.http.get(this.server + this.url);
  }

  addMoneyToRental(instrumentId, money) {
    console.log(this.server + '/api/instrument/money/' + instrumentId + '/' + money);
    return this.http.get(this.server + '/api/instrument/money/' + instrumentId + '/' + money);
  }

  updateMessage(message, id) {
    return this.http.post(this.server + '/api/school/message/' + id, message);
  }

  getUsernames() {
    return this.http.get(this.server + '/api/school/usernames');
  }

  updateSchool(id, school) {
    console.log(school);
    console.log(JSON.stringify(school));
    return this.http.put(this.server + '/api/school/' + id, (school));
  }

  createLog(id, log) {
    return this.http.post(this.server + '/api/log/', (log));
  }

  createSchool(school) {
    console.log(school);
    console.log(JSON.stringify(school));
    return this.http.post(this.server + this.url, (school));
  }

  getContentsOfSchool(id) {
    return this.http.get(this.server + this.url + '/' + id);
  }

  getInstrumentsBySchoolId(id) {
    return this.http.get(this.server + this.url + '/' + id + '/instruments', id);
  }

  getSchoolInstruments(schoolId, instrument) {
    console.log(instrument);
    return this.http.get(this.server + '/api/type/get/' + schoolId + '/' + instrument);
  }

  deleteFaculty(facultyId) {
    return this.http.delete(this.server + '/api/faculty/' + facultyId);
  }

  getInstrument(id) {
    return this.http.get(this.server + '/api/instrument' + '/' + id);
    // return new Observable();
  }

  setStatus(id, status) {
    return this.http.put(this.server + '/api/instrument/' + id + '/' + status, 'hello');
  }

  getDonorById(id) {
    return this.http.get(this.server + '/api/donor/' + id);
    // return new Observable();
  }

  createInstrument(instrument) {
    console.log(instrument);
    console.log(JSON.stringify(instrument));
    return this.http.post(this.server + '/api/instrument/', (instrument));
  }

  getRenter(id) {
    return this.http.get(this.server + '/api/renter/' + id);
  }

  getDonor(id) {
    return this.http.get(this.server + '/api/donor/' + id);
  }

  deleteBySchool(schoolId) {
    return this.http.delete(this.server + '/api/type/' + schoolId);
  }
  postInstrumentPreference(schoolId, instrumentName) {
    return this.http.get(this.server + '/api/type/' + schoolId + '/' + instrumentName);
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get(this.server + '/api/faculty/get/' + schoolId);
  }

  createFaculty(faculty) {
    console.log(JSON.stringify(faculty));
    return this.http.post(this.server + '/api/faculty', faculty);
  }

  getAllDistricts() {
    return this.http.get(this.server + '/api/district');
  }

  getSchoolsByDistrictId(id) {
    return this.http.get(this.server + '/api/school/district/' + id);
  }

  updateInstrument(id, instrument) {
    return this.http.put(this.server + '/api/instrument/' + id, instrument);
  }

  getAllInstruments() {
    return this.http.get(this.server + '/api/instrument');
  }


}
