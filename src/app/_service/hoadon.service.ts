import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {

constructor(private http: HttpClient) { }

getHoaDon(){
  return this.http.get<any>(`${environment.apiUrl}hoadon`);
}
}
