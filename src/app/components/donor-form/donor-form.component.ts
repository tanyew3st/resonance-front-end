import {Component, OnInit, Output, Input, ViewChild, EventEmitter} from '@angular/core';
import {v} from '@angular/core/src/render3';
import { DonorService } from '../../services/donor-service/donor-service.service';
import {parseHttpResponse} from 'selenium-webdriver/http';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.css']
})
export class DonorFormComponent implements OnInit {

  constructor(private service: DonorService) {

  }

 // public static id = 1;
  numberToGoBy;
  value2: any;
  instrumentCreated: boolean;
  hope: any = 111;
  showInstrument = true;
  showDonor = false;
  donorId;
  schoolId: any;
  facultyMembersHidden = true;
  crazyKey: any;

  instruments = [
    {id: 1, name: 'Trumpet'},
    {id: 2, name: 'Tuba'},
    {id: 3, name: 'Trombone'},
    {id: 4, name: 'Violin'},
    {id: 5, name: 'Viola'},
  ];

  sizes = [
    {id: 1, name: '1/4'},
    {id: 2, name: '1/2'},
    {id: 3, name: '3/4'},
    {id: 4, name: 'Full'}
  ];

  conditions = [
    {id: 1, name: 'Perfect'},
    {id: 2, name: 'Minor Scratches'},
    {id: 3, name: 'Well Used'},
    {id: 4, name: 'Needs Repair'},
    {id: 5, name: 'Unplayable in current state'},
  ];

  continueButtonDisabled = true;
  schoolOptionDisabled = true;
  schools: any;
  checkedSchools: any = [];

  currentSchool: any = [];
  donorCreated: boolean;
  value: any;
  facultyMembers: any = [];

  log(x) {
  }

  // Donor Form
  submit(f) {
    this.value = f.value;
//    this.value.id = DonorFormComponent.id;
//    DonorFormComponent.id++;
    this.createDonor(this.value);
    this.showDonor = true;
    this.showInstrument = false;
  }

  createDonor(f) {
      const donor = f;
      this.service.createDonor(donor)
        .subscribe(response => {
          this.donorId = response;
         this.donorCreated = true;
        });
  }

  ngOnInit() {
    {
       this.service.getSchools()
         .subscribe(response => {
          this.schools = response;
         });
    }
  }

  getFacultyMembers(schoolId) {
    this.service.getFacultyMembersBySchool(schoolId)
      .subscribe(response => {
        this.facultyMembers = response;
        this.facultyMembersHidden = !this.facultyMembersHidden;
      });
  }

  continue(g: any) {
    this.findSchoolsByInstrument(g.value.type);
  }

  findSchoolsByInstrument(instrumentName) {
    this.checkedSchools = [];
    for (let school of this.schools) {
      this.service.getSchoolInstruments(school.id, instrumentName)
        .subscribe(response => {
          console.log(response);
          if (response === true) {
            this.checkedSchools.push(school);
          }
          this.schoolOptionDisabled = false;
        });
    }

  }
  closeItOff(g) {
    this.service.getSchoolById(g.value.schoolId)
      .subscribe(response => {
        this.currentSchool = response;
      })
    this.getFacultyMembers(g.value.schoolId);
  }

  submitInstrument(g) {
    this.value2 = g.value;
    this.value2.status = 'donationRequested';
    this.value2.donorId = this.donorId;
    this.value2.owner = 'Resonance';
    // this.value2.amountPaid = 0;
    this.schoolId = this.value2.schoolId;
//    this.value.id = InsrumentFormComponent.id;
//    InstrumentFormComponent.id++;
    this.createInstrument(this.value2);
  }

  createInstrument(f) {
    const instrument = f;
    this.service.createInstrument(instrument)
      .subscribe(response => {
        this.crazyKey = response;
        this.instrumentCreated = true;
      });
  }


}
