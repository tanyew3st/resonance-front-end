import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../services/school-service/school-service.service';
import {qR} from '@angular/core/src/render3';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.css']
})
export class SchoolDashboardComponent {

  instruments: any = [];
  renter: any = [];
  donor: any = [];
  id;
  login = false;
  dashboard = true;
  schools: any = [];
  hideCheckbox = true;
  instrumentAddFormVisible = true;
  value2: any;
  value3: any;
  showFacultyForm = true;
  schoolName: any;
  thisSchool: any = [];
  incorrectUsernamePassword: any = false;
  rentalFee;
  showAllFaculty = true;
  facultyMembers: any = [];
  showEdit = true;
  rentalFee2;
  newRentalFee;
  showInstrumentSortForm = true;
  showSchoolSortForm = true;

  allInstruments = [
    {id: 1, name: 'Trumpet', checked: false},
    {id: 2, name: 'Tuba', checked: false},
    {id: 3, name: 'Trombone', checked: false},
    {id: 4, name: 'French Horn', checked: false},
    {id: 5, name: 'Flute', checked: false},
    {id: 5, name: 'Clarinet', checked: false},
    {id: 5, name: 'Baritone', checked: false},
    {id: 5, name: 'Tuba', checked: false},
    {id: 5, name: 'Saxophone', checked: false},
    {id: 5, name: 'Violin', checked: false},
    {id: 5, name: 'Viola', checked: false},
    {id: 5, name: 'Cello', checked: false},
    {id: 5, name: 'Bass', checked: false},
    {id: 5, name: 'Percussion', checked: false},
    {id: 5, name: 'Other', checked: false},
  ];

  instrumentTypes = [
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

  inventory: any = [];
  donationRequested: any = [];
  rentedOut: any = [];
  rentalRequested: any = [];
  transfer: any = [];
  repair: any = [];

  inventoryText = 'Inventory';
  donationRequestText = 'Donation Requests';
  rentedOutText = 'Rented Instruments';
  rentalRequestedText = 'Rental Requested Instruments';
  transferText = 'Transfer Requested';
  repairText = 'In Repair (Closed to Rental / Transfer)'

  rentedOutCards = true;
  inventoryCards = true;
  donationRequestedCards = true;
  rentalRequestedCards = true;
  transferCards = true;
  repairCards = true;
  showMessage = true;
  changesToMake: any = {};
  thisDistrict: any;

  schoolsInDistrict: any;
  schoolsToUseInDistrict: any = [];

  currentSchool = false;

  instrumentsToUse = ['Trumpet', 'Tuba', 'Violin', 'Viola', 'Trombone'];

  constructor(private service: SchoolService) { }

  // deleteInstrument(instrumentId) {
  //   this.service.deleteInstrument(instrumentId)
  //     .subscribe(response => {
  //       console.log('deleted instrument ' + instrumentId);
  //     });
  // }

  // District Stuff


  getSchoolsInDistrict() {
    this.service.getContentsOfDistrict(this.thisSchool.districtId)
      .subscribe(response => {
        this.thisDistrict = response;
      });
    return this.service.getSchoolsByDistrictId(this.thisSchool.districtId)
      .subscribe(response => {
        if (this.schoolsToUseInDistrict.length < 1) {
          console.log('in the body');
          this.schoolsToUseInDistrict = response;
        }
        this.schoolsInDistrict = response;
        console.log('schools to use in district ' + this.schoolsToUseInDistrict);
        this.displaySchools();
      });
  }


  displaySchools() {

    for (let i in this.schoolsToUseInDistrict) {
      this.service.getInstrumentsBySchoolId(this.schoolsInDistrict[i].id)
        .subscribe(res => {
          const res2: any = res;
          this.schoolsInDistrict[i].instruments = [];
          for (let instrument of res2) {
            for (let option of this.instrumentsToUse) {
              if (instrument.type === option) {
                this.schoolsInDistrict[i].instruments.push(instrument);
              }
            }
          }
          // this.schoolsInDistrict[i].instruments = res;
          console.log(this.schoolsInDistrict);
        });
    }

  }

  filterSchoolsInDistrict(r) {
    r = r.value;
    console.log(r);
    this.schoolsToUseInDistrict = [];

    for (const school in r) {
      if (r[school] === true) {
        console.log(school);
        this.schoolsToUseInDistrict.push(school);
        console.log(r[school]);
        console.log(this.schoolsToUseInDistrict);
      }
    }

    this.getSchoolsInDistrict();
  }


  filterInstruments(w) {
    w = w.value;
    console.log(w);
    this.instrumentsToUse = [];

    for (const instrument in w) {
      if (w[instrument] === true) {
        console.log(instrument);
        this.instrumentsToUse.push(instrument);
        console.log(w[instrument]);
        console.log(this.instrumentsToUse);
      }
    }

    this.getSchoolsInDistrict();
  }













  addTransferId(schoolId, instrumentId) {
    let instrument;
    this.service.getInstrument(instrumentId)
      .subscribe(response => {
        instrument = response;
        instrument.potentialSchool = schoolId;
        instrument.status = 'transfer';
        this.service.updateInstrument(instrumentId, instrument)
          .subscribe(res => {
            console.log('subscribed');
          });
      });
    console.log('setting the statussss');

  }

  // LOG STUFF

  logRental(instrument) {
    let logArray: any = {};

    logArray.date = new Date().toDateString();
    logArray.renterId = instrument.renterId;
    logArray.type = 'rental';
    logArray.schoolId = this.id;
    logArray.instrumentId = instrument.id;

    console.log(logArray);
    this.service.createLog(instrument.id, logArray)
      .subscribe(response => {
        console.log('yah created');
      });
  }

  logDonation(instrument) {
    let logArray: any = {};

    logArray.date = new Date().toDateString();
    logArray.donorId = instrument.donorId;
    logArray.type = 'donation';
    logArray.schoolId = this.id;
    logArray.instrumentId = instrument.id;

    console.log(logArray);
    this.service.createLog(instrument.id, logArray)
      .subscribe(response => {
        console.log('yah created');
      });
  }






















  changeInstrumentId(instrument) {
    instrument.schoolId = instrument.potentialSchool;

    this.service.updateInstrument(instrument.id, instrument)
      .subscribe(response => {
        console.log('successss');
        this.setStatus(instrument.id, 'inventory');
      });
  }


  checkInstruments() {
    for (let instrument in this.allInstruments) {
      this.service.getSchoolInstruments(this.id, this.allInstruments[instrument].name)
        .subscribe(response => {
          let ind = instrument;
          console.log(this.allInstruments[ind].name);
          console.log('checking the ' + this.allInstruments[ind].name);
          console.log(response);
          if (response === true) {
            this.allInstruments[instrument].checked = true;
            console.log('setting ' + this.allInstruments[ind].name + 'to ' + this.allInstruments[ind].checked);
          }
        });
    }
  }

  updateMessage(message) {
    this.service.updateMessage(message, this.id)
      .subscribe(res => {
        console.log('updated message');
      });
  }

  clearChangesToMake() {
    this.changesToMake = {};
    console.log('cleared changes');
  }

  updateSchool(f) {
    this.changesToMake['id'] = this.id;
    console.log(this.changesToMake);

    this.service.updateSchool(this.id, this.changesToMake)
      .subscribe(response => {
        console.log('updated and put a school at ' + this.id);
      });
  }

  changeRentedOut() {
    console.log('Change rented out called');
    if (this.rentedOutCards === true) {
      console.log('rented out cards is TRUE');
      this.rentedOutText = 'Rented Instruments';
    }
    if (this.rentedOutCards === false) {
      console.log('rented out cards is FALSE');
      this.rentedOutText = 'Rented Instruments';
    }
    this.rentedOutCards = !this.rentedOutCards;
  }
  changeRepair() {
    console.log('Change repair out called');
    if (this.repairCards === true) {
      console.log('repair out cards is TRUE');
      this.repairText = 'In Repair (Closed to Rental / Transfer)';
    }
    if (this.repairCards === false) {
      console.log('rented out cards is FALSE');
      this.repairText = 'In Repair (Closed to Rental / Transfer)';
    }
    this.repairCards = !this.repairCards;
  }
  changeInventory() {
    console.log('Change rented out called');
    if (this.inventoryCards === true) {
      console.log('rented out cards is TRUE');
      this.inventoryText = 'Inventory';
    }
    if (this.inventoryCards === false) {
      console.log('rented out cards is FALSE');
      this.inventoryText = 'Inventory';
    }
    this.inventoryCards = !this.inventoryCards;
  }
  changeRentalRequest() {
    console.log('Change rented out called');
    if (this.rentalRequestedCards === true) {
      console.log('rented out cards is TRUE');
      this.rentalRequestedText = 'Rental Requested Instruments';
    }
    if (this.rentalRequestedCards === false) {
      console.log('rented out cards is FALSE');
      this.rentalRequestedText = 'Rental Requested Instruments';
    }
    this.rentalRequestedCards = !this.rentalRequestedCards;
  }
  changeDonationRequested() {
    console.log('Change rented out called');
    if (this.donationRequestedCards === true) {
      console.log('rented out cards is TRUE');
      this.donationRequestText = 'Donation Requests';
    }
    if (this.donationRequestedCards === false) {
      console.log('rented out cards is FALSE');
      this.donationRequestText = 'Donation Requests';
    }
    this.donationRequestedCards = !this.donationRequestedCards;
  }

  changeTransfer() {
    if (this.transferCards === true) {
      this.transferText = 'Transfer Requests';
    }
    if (this.transferCards === false) {
      this.transferText = 'Transfer Requests';
    }
    this.transferCards = !this.transferCards;
  }

  fetchFacultyMembers() {
      this.service.getFacultyMembersBySchool(this.id)
        .subscribe(response => {
          this.facultyMembers = response;
          console.log(this.facultyMembers);
        });
  }

  deleteFacultyMemberById(facultyId) {
    this.service.deleteFaculty(facultyId)
      .subscribe(response => {
        console.log('deleted');
        this.fetchFacultyMembers();
      });
  }

  log(x) {
    // console.log(x);
  }

  pushChange(x) {
    const item: any = [];
    this.changesToMake[x.name] = x.value;
    console.log(this.changesToMake);
  }

  submitFaculty(faculty) {
    this.value3 = faculty.value;
    this.value3.schoolId = this.id;
    this.createFaculty(this.value3);
  }

  createFaculty(f) {
    const donor = f;
    this.service.createFaculty(donor)
      .subscribe(response => {
        console.log(this.value3);
        console.log(response);
      });
  }

  deleteInstrument(id) {
    this.service.deleteInstrument(id)
      .subscribe(resposne => {
        // this.reload();
      });
  }

  submitInstrument(g) {
    this.value2 = g.value;
    this.value2.status = 'inventory';
    this.value2.schoolId = this.id;
    this.value2.owner = this.schoolName;
    this.createInstrument(this.value2);
    console.log(g.value);
  }

  createInstrument(f) {
    const instrument = f;
    console.log('reached here');
    this.service.createInstrument(instrument)
      .subscribe(response => {
        console.log('yay created');
        this.reload();
      });
  }

  submit4(ins) {
    this.hideCheckbox = true;
    const formInstrument: any = ins.value;
   // console.log(ins.value.Trumpet);
   //  for (let instrument of this.allInstruments) {
   //    console.log(instrument['id']);
   //  }
    console.log(ins);
    this.service.deleteBySchool(this.id)
      .subscribe(response => {
        for (let instrument in formInstrument) {
          console.log(formInstrument[instrument]);
          // if (formInstrument[instrument] === true) {
          //   console.log(instrument);
          //   console.log("reached here!!!");
          //   this.service.postInstrumentPreference(this.id, instrument)
          //     .subscribe(response => {
          //       console.log('yay successs');
          //     });
          // }
          // if (formInstrument[instrument] === '') {
            for (let instruments in this.allInstruments) {
              if (this.allInstruments[instruments].name === instrument) {
                if (this.allInstruments[instruments].checked === true) {
                  console.log(instruments + ' ' + instrument);
                  this.service.postInstrumentPreference(this.id, instrument)
                    .subscribe(response => {
                      console.log('yay success');
                    });
                }
  //          }
            }
          }
        }
      });
  }

  submit3(q) {
    this.service.getSchool()
      .subscribe(response => {
        this.schools = response;
        console.log(this.schools)
        for (let school of this.schools) {
          console.log(school.username);
          if (school.username === q.value.username && school.password === q.value.password) {
            console.log(school);
            console.log(school.id);
            this.id = school.id;
            this.newRentalFee = school.rentalFee;
            this.login = true;
            this.dashboard = false;
            this.proceed(school.rentalFee);
            this.service.getContentsOfSchool(this.id)
              .subscribe(res => {
                console.log(res);
                const object: any = res
                this.schoolName = object.name;
                this.thisSchool = res;
                console.log(this.rentalFee);
                this.getSchoolsInDistrict();
                // this.fetchFaculty();
              });
          }
          else {
            this.incorrectUsernamePassword = true;
          }
        }
      });
  }

  // adding money using cash payment

  addMoney(a, instrument) {
    console.log(a.value.pay);
    console.log(instrument.id);
    this.service.addMoneyToRental(instrument.id, a.value.pay)
      .subscribe(response => {
        console.log(response);
      });
  }

  reload() {
    console.log(this.allInstruments);

    this.service.getInstrumentsBySchoolId(this.id)
      .subscribe(response => {
        this.getSchoolsInDistrict();
        this.instruments = response;
        console.log(this.instruments);
        this.donationRequested = [];
        this.rentalRequested = [];
        this.inventory = [];
        this.rentedOut = [];
        this.transfer = [];
        this.repair = [];
        this.fillStatus();
        // this.fillRenterArray();
        // this.fillDonorArray();
      });
  }

  proceed(rentalFeee) {
    this.service.getInstrumentsBySchoolId(this.id)
      .subscribe(response => {
        this.rentalFee = rentalFeee;
        this.instruments = response;
        // console.log(this.instruments);
        this.fillStatus();
        // this.fillRenterArray();
        // this.fillDonorArray();
      });

  }

  // filling the status of all the instruments

  fillStatus() {
    for (const instrument of this.instruments) {
      instrument.showPayment = false;
      instrument.showDonor = false;
      instrument.showRenter = false;
      instrument.showInstrument = false;
    }

    for (const instrument of this.instruments) {
      if (instrument.status === 'inventory') {
        this.inventory.push(instrument);
      }
    }
    this.fillRenterArray(this.inventory);
    this.fillDonorArray(this.inventory);

    for (let instrument of this.instruments) {
      if (instrument.status === 'rentedOut') {
        this.rentedOut.push(instrument);
      }
    }
    this.fillRenterArray(this.rentedOut);
    this.fillDonorArray(this.rentedOut);

    for (let instrument of this.instruments) {
      if (instrument.status === 'repair') {
        this.repair.push(instrument);
      }
    }
     this.fillRenterArray(this.repair);
    this.fillDonorArray(this.repair);

    for (let instrument of this.instruments) {
      if (instrument.status === 'rentalRequested') {
        this.rentalRequested.push(instrument);
      }
    }
    this.fillRenterArray(this.rentalRequested);
    this.fillDonorArray(this.rentalRequested);

    for (let instrument of this.instruments) {
      if (instrument.status === 'donationRequested') {
        this.donationRequested.push(instrument);
      }
    }
    this.fillRenterArray(this.donationRequested);
    this.fillDonorArray(this.donationRequested);

    for (let instrument of this.instruments) {
      if (instrument.status === 'transfer') {
        instrument.showTransfer = false;
        this.service.getContentsOfSchool(instrument.potentialSchool)
          .subscribe(response => {
            const potSchool: any = response;
            instrument.potentialSchoolName = potSchool.name;
            instrument.potentialSchoolAddress = potSchool.address;
            this.service.getFacultyMembersBySchool(instrument.potentialSchool)
              .subscribe(res => {
                instrument.potentialSchoolFacultyMembers = res;
                this.transfer.push(instrument);
                console.log(instrument.potentialSchoolFacultyMembers);
              });
          });
      }
    }
    this.fillRenterArray(this.transfer);
    this.fillDonorArray(this.transfer);

    console.log(this.rentalRequested);
  }

  // filling renter attributes

  fillRenterArray(array) {
    for (let index in array) {
      // console.log(this.instruments[index].renterId);
      if (array[index].renterId !== null) {
        this.service.getRenter(array[index].renterId)
          .subscribe(res => {
            let renterObject: any;
            renterObject = res;
            array[index].renterFirstName = renterObject.firstName;
            array[index].renterLastName = renterObject.lastName;
            array[index].renterEmail = renterObject.email;
            console.log(this.instruments[index]);
          });
      }
    }
  }

  // filling donor attributes

  fillDonorArray(array) {
    for (const index in array) {
      // console.log(this.instruments[index].donorId);
      console.log(array[index].donorId);
      if (array[index].donorId !== null) {
        this.service.getDonor(array[index].donorId)
          .subscribe(res => {
            let donorObject: any;
            donorObject = res;
            console.log(res);
            array[index].donorFirstName = donorObject.firstName;
            array[index].donorPhoneNumber = donorObject.phoneNumber;
            array[index].donorLastName = donorObject.lastName;
            array[index].donorEmail = donorObject.email;
            console.log(this.instruments[index]);
          });
      }
    }
  }

  // setting the status of the instruments

  setStatus(id, status) {

    this.service.setStatus(id, status)
      .subscribe(response => {
        console.log('changed the status');
        console.log('the status should no wbe ' + status);
        console.log(response);
        this.service.getInstrument(id)
          .subscribe(res => {
            const instrument: any = res;
            console.log(instrument.status);
          });
      });
  }
}
