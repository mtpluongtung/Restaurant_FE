import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NhanVien } from '../_model/NhanVien';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

constructor(private http : HttpClient) { }

  getDanhSachNhanVien(params :any): Observable<any> {
    let requestParams = new HttpParams()
    .set('text', params.text)
    .set('Page', params.Page)
    .set('PageSize', params.PageSize);
  
  return this.http.get<any>(`${environment.apiUrl}NhanVien`, { params: requestParams });
  }

  CapNhatNhanVien(nhanVien: NhanVien): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}NhanVien`, nhanVien);
  }
  xoaNhanVien(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}NhanVien/${id}`);
  }
}
