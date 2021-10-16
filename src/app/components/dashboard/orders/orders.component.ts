import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcoountService } from 'src/app/services/acoount.service';
import { CourierService } from 'src/app/services/courier.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any;
  userInfo: any;
  couriers: any;
  //areas = [];
  courierAreas: any;
  selectedOrderId: any;

  testArr: any[] = [];
  obj= {
    id: 0,
    price: 0
   };




  closeResult = '';
  constructor(private dashboardService: DashboardService, 
    private accountService: AcoountService, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userInfo = this.accountService.user;
    if(this.userInfo.user_type == 1) {
      this.getCookOrders()
    }else if(this.userInfo.user_type == 2) {
      this.getCourierActiveOrders()
      this.getCourierOrders()
    }
    this.getCouriersWithAreas()
    
    this.getCouriers()
   // this.getDeliveryAreas()


    //this.off()
    //console.log(this.userInfo)
  }

  getCookOrders() {
    //const token = localStorage.getItem('token');
    this.dashboardService.getCookActiveOrders(this.userInfo.id ).subscribe(response =>{
      this.orders= response
      //console.log(response)
    }, error =>{
      console.log(error)
    })
  }

  getCourierActiveOrders() {
    this.dashboardService.getCourierActiveOrders(this.userInfo.id).subscribe(response => {
     // console.log(response)
    }, error => {
      console.log(error)
    })
  }

  getCourierOrders() {
    this.dashboardService.getCourierOrders(this.userInfo.id).subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }


  getCouriers() {
    this.dashboardService.getCouriers().subscribe(response =>{
      this.couriers = response 
    // console.log(response)
    }, error => {
      console.log(error)
    })
  }

  



  // getDeliveryAreas() {
  //   this.dashboardService.getDeliveryAreas().subscribe(response =>{
  //     this.areas = response;
  //     //console.log(response)  
  //   })
  // }

  getCouriersWithAreas() {
    this.dashboardService.getCouriersWithAreas().subscribe(response =>{
      this.courierAreas = response;
      //console.log(this.courierAreas)
    }, error => {
      console.log(error)
    })
  }

  addCourier(courierId) {
    const body = {
      "courier": +courierId
    }
    this.dashboardService.addCourier(this.selectedOrderId, body).subscribe(response =>{
     // console.log(response)  
    }, error => {
     console.log(error)
    })
    //console.log(this.selectedOrderId + '   ' + courierId)
  }

  testt(test){
    console.log(test)
  }



  open(content , orderId) {
    this.modalService.open(content, { size: 'xl' });
    this.selectedOrderId = orderId

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  //off() {
    // console.log(this.areas )
    // console.log(this.courierAreas)

    
  //   for(let i=0; i<this.courierAreas.length; i++) {
  //     let correctFormat = {
  //       courierId: '',
  //       areaId: '',
  //       areaName: '',
  //       price: ''
  //     }
  //     correctFormat.courierId = this.courierAreas[i].courier;
  //     correctFormat.areaId = this.courierAreas[i].area.id;
  //     correctFormat.areaName = this.courierAreas[i].area.area_name;
  //     correctFormat.price = this.courierAreas[i].delivery_price;
  //     //console.log(correctFormat)
  //     this.testArr.push(correctFormat)
  //     // localStorage.setItem('cookAreas', JSON.stringify(this.testArr))
  //   }
  //   // this.testArr = arr;
  //   // console.log(" hayda")
  //    console.log( this.testArr)
  // }

}
