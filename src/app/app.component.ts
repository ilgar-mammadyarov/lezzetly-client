import { Component, OnInit } from '@angular/core';
import { AcoountService } from './services/acoount.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  
  constructor(private accountService: AcoountService) { }

  ngOnInit() {
  //  this.loadCurrentUser()
  }

  // loadCurrentUser() {
  //   const token = localStorage.getItem('token');
  //   this.accountService.loadCurrentUser(token).subscribe(() => {
  //     console.log('user loadad')
  //   }, error => {
  //     console.log(error)
  //   })

  // }

}
