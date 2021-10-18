import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AcoountService } from 'src/app/services/acoount.service';
import { MealsService } from 'src/app/services/meals.service';

declare const L: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  userLatitude: any;
  userLongtitude: any;
  selLatLng: any;
  cartMeals: any;
  mealItems: any[] = [];
  user: any;
  constructor(private mealService: MealsService, private toastr: ToastrService,private accountService: AcoountService) { 
    // if(localStorage.getItem('token')){
    //   accountService.loadUserByToken().subscribe(response => {
    //     this.userInfo = response
    //     console.log(this.userInfo)
    //   })
    // }
  }

  ngOnInit(): void {

      this.getCurrentUser()
    
    
    this.createCheckoutForm()
    this.findMyLocation()
    this.getCartMeals()
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
          .setContent("Copy and paste to Address place: " + this.selectedLatLng)
          .openOn(mymap);
      }
    });
  }
  createCheckoutForm() {
    // if(this.userInfo) {
    //   this.checkoutForm = new FormGroup({
    //     customer_first_name: new FormControl(this.userInfo.user.first_name, Validators.required),
    //     customer_last_name: new FormControl(this.userInfo.user.last_name, Validators.required),
    //     customer_phone: new FormControl(this.userInfo.user.phone, Validators.required),
    //     customer_location: new FormControl('', Validators.required),
    //     //customer_location: new FormControl(this.selLatLng),
    //     customer_email: new FormControl(this.userInfo.user.email, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    //     // complete: new FormControl('', Validators.required),
    //     complete: new FormControl('false'),
    //     //order_items: new FormControl([], Validators.required)
    //     order_items: new FormControl(this.mealItems)
    //   })
    // }
    this.checkoutForm = new FormGroup({
      customer_first_name: new FormControl('', Validators.required),
      customer_last_name: new FormControl('', Validators.required),
      customer_phone: new FormControl('', Validators.required),
      customer_location: new FormControl('', Validators.required),
      //customer_location: new FormControl(this.selLatLng),
      customer_email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      // complete: new FormControl('', Validators.required),
      complete: new FormControl('false'),
      //order_items: new FormControl([], Validators.required)
      order_items: new FormControl(this.mealItems)
    })
  }

  getCartMeals() {
    this.cartMeals = JSON.parse(localStorage.getItem('cartMeals')) 
    for(let i=0; i<this.cartMeals.length; i++) {
      let obj = {
        "quantity": this.cartMeals[i].quantity,
        "meal": this.cartMeals[i].id
      }
      this.mealItems.push(obj)
    }
    console.log(this.mealItems)
  }



  onSubmit() {
    //console.log(this.checkoutForm.value)
    this.mealService.postOrder(this.checkoutForm.value).subscribe(response => {
      //console.log(response)
      this.toastr.success(response.message)
      localStorage.removeItem('cartMeals')
    }, error => {
      console.log(error)
      this.toastr.error('Something went wrong ;(((')
    })
  }



  getCurrentUser() {
    const token = localStorage.getItem('token')
    
    if (token) {
      this.accountService.loadUser(token).subscribe(response => {
        this.user = (response as any).user
        this.checkoutForm.patchValue({
          customer_first_name: this.user.first_name,
          customer_last_name: this.user.last_name,
          customer_phone: this.user.phone,
          customer_email: this.user.email

        })
        console.log(this.user.id)
        console.log(response)
      })
    }
  }



}
