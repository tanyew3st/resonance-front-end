import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private url = '/api/renter';

  server = 'http://resonance-2-spring.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }


  getSchools() {
    return this.http.get(this.server + '/api/school');
  }

  // setInstrumentRenterId(instrumentId, renterId) {
  //   return this.http.patch(this.server + '/api/instrument/' + instrumentId + '/renter', renterId);
  // }

  getInstrumentsBySchoolId(id) {
    return this.http.get(this.server + '/api/school' + '/' + id + '/instruments', id);
  }

  createMessage(message, id) {
    console.log(JSON.stringify(message));
    return this.http.put(this.server + '/api/renter/message/' + id, JSON.stringify(message));
  }

  createRenter(renter) {
    console.log(renter);
    console.log(JSON.stringify(renter));
    return this.http.post(this.server + this.url, (renter));
  }

  setStatus(id, status) {
    return this.http.put(this.server + '/api/instrument/' + id + '/' + status, 'hello');
  }

  getInstrument(id) {
    return this.http.get(this.server + '/api/instrument' + '/' + id);
    // return new Observable();
  }

  getFacultyMembersBySchool(schoolId) {
    return this.http.get(this.server + '/api/faculty/get/' + schoolId);
  }

  createInstrument(instrument) {
    console.log(instrument);
    console.log(JSON.stringify(instrument));
    return this.http.post(this.server + '/api/instrument', (instrument));
  }

}


