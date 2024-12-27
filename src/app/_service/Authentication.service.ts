import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserSessionModel } from '../_model/UserSessionModel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../_model/LoginModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn= new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<UserSessionModel>;
  public currentUser: Observable<UserSessionModel>=
  (new BehaviorSubject<UserSessionModel>(JSON.parse('{"flag": false}'))).asObservable();
  constructor(
      private router:Router,
      private http:HttpClient
  ){
      this.currentUserSubject= new BehaviorSubject<UserSessionModel>(
          JSON.parse(localStorage.getItem('currentUser')|| '{"flag":false}')
      );
      this.currentUser= this.currentUserSubject.asObservable();
      this.loggedIn.next(JSON.parse(localStorage.getItem('currentUser')|| '{"flag": false}').flag||false)
  }
  public get isLoggedIn(){
      return this.loggedIn.asObservable();
  }
  public get userValue():UserSessionModel{
      return this.currentUserSubject.value;
  }
  login(param:LoginModel){
      return this.http.post<UserSessionModel>(`${environment.apiUrl}Authen`,{username:param.Username,password:param.PassWord})
      .pipe(map(user=>{
          if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              this.loggedIn.next(user.flag);
              this.startRefreshTokenTimer();
            }
            return user;
      }))
  }
  logout(){
      this.router.navigate(['/login']);
      this.stopRefreshTokenTimer();
      localStorage.removeItem('currentUser');
      this.loggedIn.next(false);
      this.currentUserSubject.next({
          flag:false,
          user:"",
          token:''
      });
  }
 refreshToken(){
  return this.http.post<any>(`${environment.apiUrl}Authen/refresh-token`,{})
  .pipe(map((user)=>{
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.startRefreshTokenTimer();
      return user;
  }));
 }
 private refreshTokenTimeout:any;
 private startRefreshTokenTimer(){
  let TokenString='';
  if(this.userValue.user!=undefined && this.userValue.token !=''){
      TokenString = this.userValue.token.split('.')[1];

      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(TokenString));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }
 }
 private stopRefreshTokenTimer() {
  clearTimeout(this.refreshTokenTimeout);
}
}
