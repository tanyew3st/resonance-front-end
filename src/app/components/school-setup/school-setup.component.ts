import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../services/school-service/school-service.service';

@Component({
  selector: 'app-school-setup',
  templateUrl: './school-setup.component.html',
  styleUrls: ['./school-setup.component.css']
})
export class SchoolSetupComponent implements OnInit {

  value: any;
  showFacultyForm: false;
  submitted: any = false;
  schoolName: any;
  usernames: any = [];
  usernameTaken = false;
  finished = true;
  password: any = true;
  districts: any = [];

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.service.getUsernames()
      .subscribe(response => {
        this.usernames = response;
      });
    this.service.getAllDistricts()
      .subscribe(response => {
        this.districts = response;
      });
  }

  getIn(pass) {
    if (pass === '1333') {
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
      this.createSchool(this.value);
    }
  }

  createSchool(f) {
    const donor = f;
    this.service.createSchool(donor)
      .subscribe(response => {
        this.submitted = !this.submitted;
      });
  }

  log(g) {
  }


}
