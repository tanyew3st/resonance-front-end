import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../services/school-service/school-service.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  instruments;
  donatedInstruments: any = [];
  couldaBeenDonated: any = [];
  allSchools: any;

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.service.getSchool()
      .subscribe(response => {
        this.allSchools = response;
      });
    this.service.getAllInstruments()
      .subscribe(response => {
        this.instruments = response;
        for (let instrument of this.instruments) {
          if (instrument.status === 'donationRequested') {
            if (instrument.schoolId !== null) {
              this.donatedInstruments.push(instrument);
            } else {
              this.couldaBeenDonated.push(instrument);
            }
          }
        }
        this.fillDonorArray(this.donatedInstruments);
      });
  }

  moveInstrument(id, schoolId) {
    let instrument: any;
    console.log(schoolId);
    this.service.getInstrument(id)
      .subscribe(response => {
        instrument = response;
        instrument.schoolId = schoolId;
        this.service.updateInstrument(id, instrument)
          .subscribe(res => {
            console.log('oh yeah' + 'just moved the instrument');
          });
      });
  }

  fillDonorArray(donatedInstruments) {
    for (let instrument of donatedInstruments) {
      this.service.getContentsOfSchool(instrument.schoolId)
        .subscribe(response => {
          instrument.schoolContents = response;
          this.service.getFacultyMembersBySchool(instrument.schoolId)
            .subscribe(response => {
              instrument.schoolContents.facultyMembers = response;
            });
        });

      this.service.getDonor(instrument.donorId)
        .subscribe(res => {
          let donorObject: any;
          donorObject = res;
          instrument.donorFirstName = donorObject.firstName;
          instrument.donorPhoneNumber = donorObject.phoneNumber;
          instrument.donorLastName = donorObject.lastName;
          instrument.donorEmail = donorObject.email;
          instrument.donorAddress = donorObject.pickUpAddress;
        });
      console.log(instrument);
    }
  }

}
