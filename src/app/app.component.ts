import { Component} from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { AdminComponent } from "./Components/admin/admin.component";
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

import { AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AdminComponent,CommonModule,AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>(observer => {
    observer.next(true);
    observer.complete();
  });

  navbarHeight: number = 0;
  constructor(){
    
  }
  isLogin:boolean =false
  title = 'Restaurant_FE';

}
