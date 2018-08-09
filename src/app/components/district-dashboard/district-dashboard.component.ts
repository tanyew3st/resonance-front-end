import { Component, OnInit } from '@angular/core';
import {DistrictService} from '../../services/district-service/district.service';

@Component({
  selector: 'app-district-dashboard',
  templateUrl: './district-dashboard.component.html',
  styleUrls: ['./district-dashboard.component.css']
})
export class DistrictDashboardComponent implements OnInit {

  districts: any;
  id;
  login = false;
  dashboard = true;
  schools: any;
  incorrectUsernamePassword;
  currentDistrict: any;
  showAnnouncement = true;

  constructor(private service: DistrictService) { }

  ngOnInit() {
  }


  updateAnnouncement(message) {
    this.currentDistrict.announcement = message;
    this.service.updateDistrict(this.id, this.currentDistrict)
      .subscribe(response => {
        });
  }

  submit3(q) {
    this.service.getDistrict()
      .subscribe(response => {
        this.districts = response;
        for (const district of this.districts) {
          // Check if the username and password combination matches
          if (district.username === q.value.username && district.password === q.value.password) {
            this.currentDistrict = district;
            this.id = district.id;
            this.login = true;
            this.dashboard = false;
            this.proceed(district.id);

            // if none of this passes
          } else {
            this.incorrectUsernamePassword = true;
          }
        }
      });
  }

  proceed(id) {
    this.service.getAllSchools(id)
      .subscribe(response => {
        this.schools = response;

        // Get all the instruments by the school id
        for (const index in this.schools) {
          this.service.getAllInstruments(this.schools[index].id)
            .subscribe(res => {
              this.schools[index].instruments = res;
              this.schools[index].instruments.donationRequested = [];
              this.schools[index].instruments.transferRequested = [];
              this.schools[index].instruments.rentedOut = [];
              this.schools[index].instruments.rentalRequested = [];
              this.schools[index].instruments.repair = [];
              this.schools[index].instruments.inventory = [];

              for (const instrument of this.schools[index].instruments) {


                if (instrument.status === 'donationRequested') {
                  this.schools[index].instruments.donationRequested.push(instrument);
                }
                if (instrument.status === 'transferRequested') {

                  instrument.showTransfer = false;
                  this.service.getContentsOfSchool(instrument.potentialSchool)
                    .subscribe(response => {
                      const potSchool: any = response;
                      instrument.potentialSchoolName = potSchool.name;
                      instrument.potentialSchoolAddress = potSchool.address;
                      this.service.getFacultyMembersBySchool(instrument.potentialSchool)
                        .subscribe(ress => {
                          instrument.potentialSchoolFacultyMembers = ress;
                        });
                    });

                  this.schools[index].instruments.transferRequested.push(instrument);
                }
                if (instrument.status === 'rentalRequested') {
                  this.service.getRenter(instrument.renterId)
                    .subscribe(renter => {
                      let renterObject: any;
                      renterObject = renter;
                      instrument.renterFirstName = renterObject.firstName;
                      instrument.renterLastName = renterObject.lastName;
                      instrument.renterEmail = renterObject.email;
                      this.schools[index].instruments.rentalRequested.push(instrument);
                    });
                }
                if (instrument.status === 'rentedOut') {
                  this.service.getRenter(instrument.renterId)
                    .subscribe(renter => {
                      let renterObject: any;
                      renterObject = renter;
                      instrument.renterFirstName = renterObject.firstName;
                      instrument.renterLastName = renterObject.lastName;
                      instrument.renterEmail = renterObject.email;
                      this.schools[index].instruments.rentalRequested.push(instrument);
                      this.schools[index].instruments.rentedOut.push(instrument);

                    });
                }
                if (instrument.status === 'repair') {
                  this.schools[index].instruments.repair.push(instrument);
                }
                if (instrument.status === 'inventory') {
                  this.schools[index].instruments.inventory.push(instrument);
                }
              }
            });
        }
      });
  }

  refresh() {
    this.proceed(this.id);
  }

}

