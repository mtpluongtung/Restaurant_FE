import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment


@Injectable({
  providedIn: 'root',
})
export class BanService {
  private apiUrl = environment.apiUrl; // Sử dụng URL từ environment

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(`${this.apiUrl}Ban`);
  }
  getListBan(params: any) {
     let requestParams = new HttpParams()
        .set('text', params.text)
        .set('Page', params.Page)
        .set('PageSize', params.PageSize);
      
      return this.http.get<any>(`${environment.apiUrl}Ban/table`, { params: requestParams });
  }
  XoaBan(id: any) {
    return this.http.delete<any>(`${this.apiUrl}Ban/${id}`);
  }
  ThemBan(data: any) {
    return this.http.post<any>(`${this.apiUrl}Ban`, data);
  }
}
