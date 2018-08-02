import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  private url = '/api/school';

  getContentsOfDistrict(id) {
    return this.http.get('/api/district/' + id);
  }

  deleteInstrument(id) {
    return this.http.delete('/api/instrument/' + id);
  }
  getSchool() {
    return this.http.get(this.url);
  }

  addMoneyToRental(instrumentId, money) {
    console.log('/api/instrument/money/' + instrumentId + '/' + money);
    return this.http.get('/api/instrument/money/' + instrumentId + '/' + money);
  }

  updateMessage(message, id) {
    return this.http.post('/api/school/message/' + id, message);
  }

  getUsernames() {
    return this.http.get('/api/school/usernames');
  }

  updateSchool(id, school) {
    console.log(school);
    console.log(JSON.stringify(school));
    return this.http.put('/api/school/' + id, (school));
  }

  createLog(id, log) {
    return this.http.post('/api/log/', (log));
  }

  createSchool(school) {
    console.log(school);
    console.log(JSON.stringify(school));
    return this.http.post(this.url, (school));
  }

  getContentsOfSchool(id) {
    return this.http.get(this.url + '/' + id);
  }

  getInstrumentsBySchoolId(id) {
    return this.http.get(this.url + '/' + id + '/instruments', id);
  }

  getSchoolInstruments(schoolId, instrument) {
    console.log(instrument);
    return this.http.get('/api/type/get/' + schoolId + '/' + instrument);
  }

  deleteFaculty(facultyId) {
    return this.http.delete('/api/faculty/' + facultyId);
  }

  getInstrument(id) {
    return this.http.get('/api/instrument' + '/' + id);
    // return new Observable();
  }

  setStatus(id, status) {
    return this.http.put('/api/instrument/' + id + '/' + status, 'hello');
  }

  getDonorById(id) {
    return this.http.get('/api/donor/' + id);
    // return new Observable();
  }

  createInstrument(instrument) {
    console.log(instrument);
    console.log(JSON.stringify(instrument));
    return this.http.post('/api/instrument/', (instrument));
  }

  getRenter(id) {
    return this.http.get('/api/renter/' + id);
  }

  getDonor(id) {
    return this.http.get('/api/donor/' + id);
  }

  deleteBySchool(schoolId) {
    return this.http.delete('/api/type/' + schoolId);
  }
  postInstrumentPreference(schoolId, instrumentName) {
    return this.http.get('/api/type/' + schoolId + '/' + instrumentName);
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get('/api/faculty/get/' + schoolId);
  }

  createFaculty(faculty) {
    console.log(JSON.stringify(faculty));
    return this.http.post('/api/faculty', faculty);
  }

  getAllDistricts() {
    return this.http.get('/api/district');
  }

  getSchoolsByDistrictId(id) {
    return this.http.get('/api/school/district/' + id);
  }

  updateInstrument(id, instrument) {
    return this.http.put('/api/instrument/' + id, instrument);
  }

  getAllInstruments() {
    return this.http.get('/api/instrument');
  }


}
