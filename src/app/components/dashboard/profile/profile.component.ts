import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcoountService } from 'src/app/services/acoount.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateRegisterForm : FormGroup;
  errors: string[];

  user: any = [];

  map;
  

  constructor(private fb: FormBuilder, private accountService: AcoountService, private router: Router) { }

  ngOnInit(): void {
    this.createProfileForm();
    this.getCurrentUser()
    this.initMap()
  }
  initMap() {
    this.map = L.map('mapid').setView([51.505, -0.09], 13);
  }

  createProfileForm() {
    this.updateRegisterForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      patronymic: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, 
        [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
       // [this.validateEmailNotTaken()]
      ],
      birth_place: [null, Validators.required],
      city: [null, Validators.required],
      service_place: [null, Validators.required],
      payment_address: [null, Validators.required],
      work_experience: [null, Validators.required],
      is_available: [null, Validators.required]
    });
  }


  getCurrentUser() {
    const token = localStorage.getItem('token')

    if(token) {
      this.accountService.loadUser(token).subscribe(response => {
        this.user = response
        console.log(this.user.user.id)
        console.log(response)
      })
    }
  }
  onSubmit() {
    const token = localStorage.getItem('token');
    console.log(this.updateRegisterForm.value);
    this.accountService.updateCookProfile(this.updateRegisterForm.value, this.user.user.id, token).subscribe(response => {
      this.router.navigateByUrl('/profile');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

}
