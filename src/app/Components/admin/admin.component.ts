import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { AuthenticationService } from '../../_service/Authentication.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [RouterLink,RouterLinkActive]
})
export class AdminComponent implements OnInit {

  constructor(private authenticationServices : AuthenticationService) { }

  ngOnInit() {

  }
  LogOut(){
    console.log('logout');
    this.authenticationServices.logout();
  }
}
