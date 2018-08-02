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
    console.log(this.password);
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
    if (pass === '1444') {
      console.log('lets go');
      this.password = !this.password;
    }
  }

  submit(f) {
    this.finished = true;
    this.value = f.value;
    this.schoolName = f.value.schoolName;
//    this.value.id = DonorFormComponent.id;
//    DonorFormComponent.id++;
    console.log(this.usernames);
    for (let username of this.usernames) {
      if (f.value.username === username) {
        this.usernameTaken = true;
        console.log('username is taken');
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
    console.log('reached here');
    this.service.createSchool(donor)
      .subscribe(response => {
        console.log(response);
        console.log('yay created');
        this.submitted = !this.submitted;
      });
  }

  log(g) {
    console.log(g);
  }


}
