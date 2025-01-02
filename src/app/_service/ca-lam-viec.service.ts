import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaLamViecService {

constructor(private http :HttpClient) { }
  GetDsCaLamViec():Observable<any>{ 
    return this.http.get(`${environment.apiUrl}ca-lam-viec`);
  }
  ThemCaLamViec(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}ca-lam-viec`,data);
  }
  SuaCaLamViec(data:any):Observable<any>{
    return this.http.put(`${environment.apiUrl}ca-lam-viec`,data);
  }
  XoaCaLamViec(id:any):Observable<any>{
    return this.http.delete(`${environment.apiUrl}ca-lam-viec/${id}`);
  }
}
