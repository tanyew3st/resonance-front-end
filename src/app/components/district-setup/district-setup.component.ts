import { Component, OnInit } from '@angular/core';
import {DistrictService} from '../../services/district-service/district.service';

@Component({
  selector: 'app-district-setup',
  templateUrl: './district-setup.component.html',
  styleUrls: ['./district-setup.component.css']
})
export class DistrictSetupComponent implements OnInit {

  submitted = false;
  usernames: any;
  usernameTaken = false;
  value: any;
  schoolName: any;
  finished = true;
  password: any = true;

  constructor(private service: DistrictService) { }

  ngOnInit() {
    this.service.getUsernames()
      .subscribe(response => {
        this.usernames = response;
      });
  }


  getIn(pass) {
    if (pass === 'setup district') {
      this.password = !this.password;
    }
  }

  submit(f) {
    this.finished = true;
    this.value = f.value;
    this.schoolName = f.value.schoolName;
//    this.value.id = DonorFormComponent.id;
//    DonorFormComponent.id++;
    for (let username of this.usernames) {
      if (f.value.username === username) {
        this.usernameTaken = true;
        this.finished = false;
      }
    }
    if (this.finished === true) {
      this.usernameTaken = false;
      this.createDistrict(this.value);
    }
  }

  createDistrict(f) {
    const district = f;
    this.service.createDistrict(district)
      .subscribe(response => {
        this.submitted = !this.submitted;
      });
  }

  log(g) {
  }


}
