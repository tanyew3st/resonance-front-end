import { Component, OnInit } from '@angular/core';
import {FollowService} from '../../services/follow-service/follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  showKeyForm = false;
  dispArray: any = [];
  donor: any = [];
  showWarningMessage = true;
  alertStuff = true;

  constructor(private service: FollowService) {

  }

  ngOnInit() {
  }

  log(x) {
    console.log(x);
  }

  findInstrument(key) {
    console.log(key);

    this.service.findAllRentals(key)
      .subscribe(response => {
        console.log(response);
        this.dispArray = response;

        this.service.getDonorLog(key)
          .subscribe(donor => {
            if (donor !== null) {
              this.showKeyForm = true;
              this.donor = donor;
            } else {
              this.alertStuff = false;
            }

          });

        for (let log in this.dispArray) {
          this.service.getRenter(this.dispArray[log].renterId)
            .subscribe(array => {
              const renter: any = array;
              this.dispArray[log].renterFirstName = renter.firstName;
              this.dispArray[log].renterLastName = renter.lastName;
              this.dispArray[log].renterMessage = renter.donorMessage;
            });
          this.service.getSchool(this.dispArray[log].schoolId)
            .subscribe(res => {
              console.log(res);
              const school: any = res;
              this.dispArray[log].schoolName = school.name;
            });

        }
        console.log(this.dispArray);

        // if (this.donor === null) {
        //   this.showWarningMessage = false;
        //   this.alertStuff = false;
        //   console.log(this.alertStuff);
        // }
      });
  }
}
