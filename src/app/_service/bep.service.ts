import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BepService {
private apiUrl = environment.apiUrl; // Sử dụng URL từ environment

  constructor(private http: HttpClient) {}

  getDanhSachMonAn(pageNumber: number, pageSize: number): Observable<any> {
    const params = { Page: pageNumber.toString(), PageSize: pageSize.toString() };
    return this.http.get<any>(`${environment.apiUrl}Bep`, { params });
  }
  UpdateBep(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}Bep`, data);
  }
}
