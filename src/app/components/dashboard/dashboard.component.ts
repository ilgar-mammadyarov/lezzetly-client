import { Component, OnInit } from '@angular/core';
import { AcoountService } from 'src/app/services/acoount.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInfo: any;
  activeOrders: any;

  constructor(private accountService: AcoountService, private dashboardService: DashboardService) { }

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
      console.log(response)
     // console.log(this.activeOrders)
    }, error => {
      console.log(error)
    })
  }

}
