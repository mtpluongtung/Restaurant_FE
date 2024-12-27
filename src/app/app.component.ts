import { Component} from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { AdminComponent } from "./Components/admin/admin.component";
import { BehaviorSubject, Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

import { AsyncPipe } from '@angular/common';
import { AuthenticationService } from './_service/Authentication.service';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AdminComponent,CommonModule,AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean> = (new BehaviorSubject<boolean>(false)).asObservable();
  constructor(private authenticationService:AuthenticationService){
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
  }
  isLogin:boolean =false
  ngOnInit() {
    
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  onActivate(envent:any){

  }
  title = 'Restaurant_FE';

}
