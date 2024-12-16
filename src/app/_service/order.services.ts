import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_model/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl; // Sử dụng URL từ environment

  constructor(private http: HttpClient) {}

  Create(data : Order) {
    console.log('CreateOrder', `${this.apiUrl}Order`);
    return this.http.post<any>(`${this.apiUrl}Order`,data);
  }

}
