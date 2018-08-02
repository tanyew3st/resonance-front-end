import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
import { RentalService } from '../../services/rental-service/rental-service.service';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {
  value;
  instraValue;
  schools: any;
  schoolId: any;
  instruments: any;
  renterId: any;
  instrumentInventory = [];
  continue = false;
  facultyMembersHidden = true;
  facultyMembers: any = [];
  showThanks = true;
  thanksDonorMessage = false;
  // schoolsByDist = [
  //   {distance: 10, name: 'School1 ', id: 111},
  //   {distance: 20, name: 'School Farther Away', id: 111},
  //   {distance: 30, name: 'EH', id: 111},
  //   {distance: 40, name: 'School Far', id: 111},
  //   {distance: 50, name: 'School Super Far', id: 111}
  // ];


  constructor(private service: RentalService) { }

  ngOnInit() {
    this.getSchools();
  }

  createMessage(m) {
    let message = m;
    console.log(message);
    this.service.createMessage(message, this.renterId)
      .subscribe(response => {
        console.log('success; heck yeah!');
      });
  }

  submit(f) {
    this.value = f.value;
//    this.value.id = DonorFormComponent.id;
//    DonorFormComponent.id++;
    this.createRenter(this.value);
    this.getInstrumentsBySchoolId();
  }

  getInstrumentsBySchoolId() {
    this.instrumentInventory = [];
    this.service.getInstrumentsBySchoolId(this.schoolId)
      .subscribe(response => {
        this.instruments = response;
        for (const instrument of this.instruments) {
          if (instrument.status === 'inventory') {
            this.instrumentInventory.push(instrument);
          }
        }
      });
  }

  createRenter(f) {
    this.schoolId = f.schoolId;
    console.log(this.schoolId);
    const donor = f;
    console.log('reached here');
    this.service.createRenter(donor)
      .subscribe(response => {
        console.log(response);
        this.renterId = response;
        console.log('yay created');
      });
  }


  log(x) {
    console.log(x);
  }

  submit2(g) {
    let value: any;
    let instrument: any = [];
    value = g.value;
    console.log(this.schoolId);
    // this.service.setInstrumentRenterId(g.value.instrument, this.renterId);
    console.log(instrument);
    this.getFacultyMembers(this.schoolId);
    this.service.getInstrument(g.value.instrument)
      .subscribe(response => {
        instrument = response;
        console.log(response);
        console.log(instrument);
        instrument.renterId = this.renterId;
        instrument.amountPaid = 0;
        this.service.createInstrument(instrument)
          .subscribe(rest => {
            this.service.setStatus(g.value.instrument, 'rentalRequested')
              .subscribe(res => {
                console.log('subscribed');
                console.log('set value of ' + g.value.instrument + ' to rental request');
              } );
          });
      });
    if (instrument.owner === 'Resonance') {
      this.showThanks = !this.showThanks;
    } else {
      this.thanksDonorMessage = true;
    }

    this.continue = !this.continue;

  }

  getFacultyMembers(schoolId) {
    this.service.getFacultyMembersBySchool(schoolId)
      .subscribe(response => {
        this.facultyMembers = response;
        console.log(this.facultyMembers);
        this.facultyMembersHidden = !this.facultyMembersHidden;
      });
  }


  getSchools() {
    this.service.getSchools()
      .subscribe(response => {
        this.schools = response;
        // console.log(this.posts[0]);
        console.log(this.schools);
      });
  }

}
