import { Component, OnInit } from '@angular/core';
import { AcoountService } from 'src/app/services/acoount.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { map } from 'rxjs/operators'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookService } from 'src/app/services/cook.service';



declare const L: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInfo: any;
  activeOrders: any;
  selectedOrder: any;
  customerLatLng: any;

  constructor(private accountService: AcoountService, 
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private cookService: CookService) { }

  ngOnInit(): void {
    this.userInfo = this.accountService.user;
    if(this.userInfo.user_type == 1) {
      this.getCookActiveOrders()
    }else if(this.userInfo.user_type ==2) {
      this.getCourierActiveOrders()
    }
  }


  getCookActiveOrders() {
    // const token = localStorage.getItem('token');

    this.dashboardService.getCookActiveOrders(this.userInfo.id).subscribe(response => {
      this.activeOrders = response
     // console.log(response)
      console.log(this.activeOrders)
    }, error => {
      console.log(error)
    })
  }

  getCourierActiveOrders() {
    // const token = localStorage.getItem('token');

    this.dashboardService.getCourierActiveOrders(this.userInfo.id).subscribe(response => {
      this.activeOrders = response
      //console.log(response[0].customer_location)
     this.customerLatLng = response[0].customer_location.split(' ');
     //console.log(this.customerLatLng)
      this.findMyLocation()
     // console.log(this.activeOrders)
    }, error => {
      console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }

  open(content , order) {
    this.modalService.open(content, { size: 'xl' });
    this.selectedOrder = order
    console.log(order)
  }




  findMyLocation() {
    // if (!navigator.geolocation) {
    //   console.log('Your device does not support NAVIGATION.')
    // }
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.userLatitude = position.coords.latitude;
    //   this.userLongtitude = position.coords.longitude;
    //  let mymap = L.map('mapid').setView([+this.activeOrders[0].customer_location], 13);
    let mymap = L.map('mapid').setView([this.customerLatLng[0], this.customerLatLng[1]], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWxnYXItbWFtbWFkeWFyb3YiLCJhIjoiY2t1Y2NlczdqMHpiZTJ3cXZtOTgxNHJraCJ9.OM5Fs2GrpkoRLN_Zual0UA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);
      var marker = L.marker([this.customerLatLng[0], this.customerLatLng[1]]).addTo(mymap);
      marker.bindPopup("<b>Customer Location</b>").openPopup();
  }

  // completeOrder(orderId) {
  //   this.cookService.completeOrder(orderId).subscribe(response => {
  //     console.log(response)
  //   }, error => {
  //     console.log(error)
  //   })
  // }

}
