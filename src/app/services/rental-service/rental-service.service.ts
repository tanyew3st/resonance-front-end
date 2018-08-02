import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private url = '/api/renter';
  constructor(private http: HttpClient) { }


  getSchools() {
    return this.http.get('/api/school');
  }

  // setInstrumentRenterId(instrumentId, renterId) {
  //   return this.http.patch('/api/instrument/' + instrumentId + '/renter', renterId);
  // }

  getInstrumentsBySchoolId(id) {
    return this.http.get('/api/school' + '/' + id + '/instruments', id);
  }

  createMessage(message, id) {
    console.log(JSON.stringify(message));
    return this.http.put('/api/renter/message/' + id, JSON.stringify(message));
  }

  createRenter(renter) {
    console.log(renter);
    console.log(JSON.stringify(renter));
    return this.http.post(this.url, (renter));
  }

  setStatus(id, status) {
    return this.http.put('/api/instrument/' + id + '/' + status, 'hello');
  }

  getInstrument(id) {
    return this.http.get('/api/instrument' + '/' + id);
    // return new Observable();
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get('/api/faculty/get/' + schoolId);
  }

  createInstrument(instrument) {
    console.log(instrument);
    console.log(JSON.stringify(instrument));
    return this.http.post('/api/instrument', (instrument));
  }

}


