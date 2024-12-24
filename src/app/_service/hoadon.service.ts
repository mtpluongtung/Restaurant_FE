import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {

  constructor(private http: HttpClient) { }

  getHoaDon(params :any): Observable<any> {
    let requestParams = new HttpParams()
    .set('text', params.text)
    .set('Page', params.Page)
    .set('PageSize', params.PageSize);
  
  // Conditionally add fromDate and toDate if they exist
  if (params.fromDate) {
    requestParams = requestParams.set('fromDate', params.fromDate.toISOString());
  }
  
  if (params.toDate) {
    requestParams = requestParams.set('toDate', params.toDate.toISOString());
  }
  return this.http.get<any>(`${environment.apiUrl}HoaDon`, { params: requestParams });
  }
  GetOrderDetail(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}HoaDon/${id}`);
  }
  thanhToan(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}HoaDon/thanh-toan?id=${id}`, {});
  }
  DoanhThuHoaDon(params :any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}HoaDon/doanh-thu-hoa-don`, params);
  }
  DoanhThuChiTiet(data : string) : Observable<any> {
    let requestParams = new HttpParams()
    .set('request', data)
    
    return this.http.get<any>(`${environment.apiUrl}HoaDon/doanh-thu-chi-tiet`, { params: requestParams });
  }
}
