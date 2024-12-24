import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonAnService {

constructor(private http: HttpClient) { }
  getListMonAn(params :any): Observable<any> {
    let requestParams = new HttpParams()
    .set('text', params.text)
    .set('Page', params.Page)
    .set('PageSize', params.PageSize);
  
  return this.http.get<any>(`${environment.apiUrl}MonAn`, { params: requestParams });
  }
  addMonAn(monAn: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}MonAn`, monAn);
  }
  xoaMonAn(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}MonAn/${id}`);
  }
}
