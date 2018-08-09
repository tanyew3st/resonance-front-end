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
  messageDone = false;
  needsThankYou = false;
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
    this.service.createMessage(message, this.renterId)
      .subscribe(response => {
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
    const donor = f;
    this.service.createRenter(donor)
      .subscribe(response => {
        this.renterId = response;
      });
  }


  log(x) {
  }

  submit2(g) {
    let value: any;
    let instrument: any = [];
    value = g.value;
    // this.service.setInstrumentRenterId(g.value.instrument, this.renterId);
    this.getFacultyMembers(this.schoolId);
    this.service.getInstrument(g.value.instrument)
      .subscribe(response => {
        instrument = response;
        this.instraValue = instrument;
        instrument.renterId = this.renterId;
        instrument.amountPaid = 0;

        if (instrument.owner === 'Resonance') {
          this.messageDone = false;
          this.needsThankYou = true;
          console.log(this.messageDone);
          console.log(this.needsThankYou);
        } else {
          this.needsThankYou = false;
          console.log(this.messageDone);
          console.log(this.needsThankYou);
        }


        this.service.createInstrument(instrument)
          .subscribe(rest => {
            this.service.setStatus(g.value.instrument, 'rentalRequested')
              .subscribe(res => {
              } );
          });
      });
    this.continue = !this.continue;

  }

  getFacultyMembers(schoolId) {
    this.service.getFacultyMembersBySchool(schoolId)
      .subscribe(response => {
        this.facultyMembers = response;
        this.facultyMembersHidden = !this.facultyMembersHidden;
      });
  }


  getSchools() {
    this.service.getSchools()
      .subscribe(response => {
        this.schools = response;
        // console.log(this.posts[0]);
      });
  }

}
