import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcoountService } from 'src/app/services/acoount.service';
//import * as L from 'leaflet';
declare const L: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateRegisterForm: FormGroup;
  errors: string[];

  user: any = [];

  //private map: L.Map;

  userLongtitude: number;
  userLatitude: number;
  selectedLatLng: string;
  myStr="1";



  constructor(private fb: FormBuilder, private accountService: AcoountService, private router: Router) {}

  ngOnInit(): void {
    this.createProfileForm();
    this.getCurrentUser()
    this.findMyLocation()
    //this.initMap()
  }


  findMyLocation() {
    if (!navigator.geolocation) {
      console.log('Your device does not support NAVIGATION.')
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.userLatitude = position.coords.latitude;
      this.userLongtitude = position.coords.longitude;
      let mymap = L.map('mapid').setView([this.userLatitude, this.userLongtitude], 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWxnYXItbWFtbWFkeWFyb3YiLCJhIjoiY2t1Y2NlczdqMHpiZTJ3cXZtOTgxNHJraCJ9.OM5Fs2GrpkoRLN_Zual0UA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);
      var marker = L.marker([this.userLatitude, this.userLongtitude]).addTo(mymap);
      marker.bindPopup("<b>I am here!</b>").openPopup();

      mymap.on('click', onMapClick);
      function onMapClick(e) {
        this.selectedLatLng = e.latlng.lat + ' ' + e.latlng.lng;
        
        console.log(this.selectedLatLng)
          var popup = L.popup();
          popup
          .setLatLng(e.latlng)
          .setContent("Copy and paste to Service place: " + this.selectedLatLng)
          .openOn(mymap);
      }
    });
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

    if (token) {
      this.accountService.loadUser(token).subscribe(response => {
        this.user = response
        console.log(this.user.user.id)
        console.log(response)
      })
    }
  }
  onSubmit() {
    const token = localStorage.getItem('token');
    console.log(this.updateRegisterForm.value)
    this.accountService.updateCookProfile(this.updateRegisterForm.value, this.user.user.id, token).subscribe(response => {
      this.router.navigateByUrl('/profile');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

}
