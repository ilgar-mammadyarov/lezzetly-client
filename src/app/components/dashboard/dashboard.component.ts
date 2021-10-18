import { Component, OnInit } from '@angular/core';
import { AcoountService } from 'src/app/services/acoount.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { map } from 'rxjs/operators'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInfo: any;
  activeOrders: any;
  selectedOrder: any;

  constructor(private accountService: AcoountService, 
    private dashboardService: DashboardService,
    private modalService: NgbModal) { }

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

  logout() {
    this.accountService.logout();
  }

  open(content , order) {
    this.modalService.open(content, { size: 'xl' });
    this.selectedOrder = order
    console.log(order)
  }
  

}
