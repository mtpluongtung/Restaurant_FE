import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {

  constructor(private http: HttpClient) { }

  getHoaDon(pageNumber: number, pageSize: number): Observable<any> {
    const params = { Page: pageNumber.toString(), PageSize: pageSize.toString() };
    return this.http.get<any>(`${environment.apiUrl}HoaDon`, { params });
  }
}
