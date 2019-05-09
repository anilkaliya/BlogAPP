import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

private isAuthenticated=false;
private isAuthListenSub:Subscription;
  ngOnInit() {
    this.isAuthenticated=this.authService.getIsAuth();
    this.isAuthListenSub=this.authService.getIsAuthListener().
    subscribe(isAuthenticated=>{
      this.isAuthenticated=isAuthenticated;
    })
  }

}
