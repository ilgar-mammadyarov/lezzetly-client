import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AcoountService } from 'src/app/services/acoount.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<any>;
  constructor(private accountService: AcoountService, private router: Router ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
