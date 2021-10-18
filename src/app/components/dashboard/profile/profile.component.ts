import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcoountService } from 'src/app/services/acoount.service';
import { CookService } from 'src/app/services/cook.service';
import { CourierService } from 'src/app/services/courier.service';
import { DashboardService } from 'src/app/services/dashboard.service';
//import * as L from 'leaflet';
declare const L: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateRegisterForm: FormGroup;
  updateCourierForm: FormGroup;
  recomForm: FormGroup;
  resumeForm: FormGroup;
  deliveryAreaForm: FormGroup;
  errors: string[];
  user: any = [];
  userInfo: any;
  userLongtitude: number;
  userLatitude: number;
  selectedLatLng: string;
  myStr="1";
  recommendations: any;
  resumes: any;
  deliveryAreas: any;
  courierDeliveryAreas: any;


  constructor(private fb: FormBuilder, 
    private accountService: AcoountService, 
    private router: Router,
    private cookService: CookService,
    private dashboardService: DashboardService,
    private courierService: CourierService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
   
    this.userInfo = this.accountService.user;
    this.getCurrentUser()
    
    
    this.findMyLocation()
    if(this.userInfo.user_type==1) {
      this.createProfileForm();
      this.createRecomForm()
      this.createResumeForm()
      this.getCookRecommedationById()
      this.getCookResumeById()
    }
  //   else if (this.userInfo.user_type==2) {
  //     this.createCourierForm();
  //     this.createDeliveryAreaForm();
  // //    this.getCourierDeliveryAreasById()
  //     this.getDeliverAreas()
  //   } 
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


  // createCourierForm() {
  //   this.updateCourierForm = new FormGroup({
  //     first_name: new FormControl(this.userInfo.name, Validators.required),
  //     last_name: new FormControl(this.userInfo.surname, Validators.required),
  //     patronymic: new FormControl('', Validators.required),
  //     phone: new FormControl('', Validators.required),
  //     location: new FormControl('', Validators.required),
  //     transport: new FormControl('', Validators.required),
  //    // deliveryArea: new FormControl('', Validators.required),
  //     work_experience: new FormControl('', Validators.required),
  //     //customer_location: new FormControl(this.selLatLng),
  //     email: new FormControl(this.userInfo.mail, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
  //     // complete: new FormControl('', Validators.required),
  //     is_available: new FormControl(false, Validators.required),
  //     //order_items: new FormControl([], Validators.required)
  //     // order_items: new FormControl(this.mealItems)
  //   })
  // }

  createRecomForm() {
    this.recomForm = new FormGroup({
      recommended_by: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  createResumeForm() {
    this.resumeForm = new FormGroup({
      description: new FormControl('', Validators.required)
    })
  }

  // createDeliveryAreaForm() {
  //   this.deliveryAreaForm = new FormGroup({
  //     area: new FormControl('', Validators.required),
  //     delivery_price: new FormControl('', Validators.required)
  //   })
  // }


  getCurrentUser() {
    const token = localStorage.getItem('token')

    if (token) {
      this.accountService.loadUser(token).subscribe(response => {
        this.user = (response as any).user
        this.updateCourierForm.patchValue({
          patronymic: this.user.patronymic
        })
        console.log(this.user.id)
        console.log(response)
      })
    }
  }
  onSubmit() {
    const token = localStorage.getItem('token');
    console.log(this.updateRegisterForm.value)
    this.accountService.updateCookProfile(this.updateRegisterForm.value, this.user.id, token).subscribe(response => {
      console.log(response)
      this.toastr.success('Updated Succesfully')
      this.router.navigateByUrl('/profile');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }



  // getDeliverAreas() {
  //   this.dashboardService.getDeliveryAreas().subscribe(response =>{
  //     this.deliveryAreas = response
  //     console.log(response)
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  // onCourierSubmit() {
  //   const token = localStorage.getItem('token');
  //   console.log(this.updateCourierForm.value)
  //   this.accountService.updateCourierProfile(this.updateCourierForm.value, this.userInfo.id).subscribe(response => {
  //     console.log(response)
  //     this.router.navigateByUrl('/profile');
  //   }, error => {
  //     console.log(error);
  //     this.errors = error.errors;
  //   })
  // }

  getCookRecommedationById() {
    this.cookService.getCookRecommendationById(this.userInfo.id).subscribe(response =>{
      this.recommendations = response
    //  console.log(response)
    }, error => {
    //  console.log(error)
    })
  }
  onRecomFormSubmit() {
   //console.log(this.recomForm.value)

    this.cookService.postRecommendationByCookId(this.userInfo.id, this.recomForm.value).subscribe(response => {
    //  console.log(response)
    this.recommendations.push(response)
    }, error => {
    //  console.log(error)
    })
  }

  getCookResumeById() {
    this.cookService.getCookResumeById(this.userInfo.id).subscribe(response => {
      this.resumes = response
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
  onResumeFormSubmit() {
    //console.log(this.resumeForm.value)
    this.cookService.postResumeByCookId(this.userInfo.id, this.resumeForm.value).subscribe(response =>{
      console.log(response)
      this.resumes.push(response)
    }, error => {
      console.log(error)
    })
  }

  // onDeliveryAreaFormSubmit() {
  //   console.log(this.deliveryAreaForm.value)
  //   this.dashboardService.postDeliveryArea(this.userInfo.id, this.deliveryAreaForm.value).subscribe(response => {
  //    // console.log(response)
  //   }, error => {
  //    console.log(error)
  //   })
  // }


  // getCourierDeliveryAreasById() {
  //   this.courierService.getCourierDeliveryAreasById(this.userInfo.id).subscribe(response =>{
  //     this.courierDeliveryAreas = response
  //     console.log(response)
  //   }, error => {
  //     console.log(error)
  //   })
  // }
}
