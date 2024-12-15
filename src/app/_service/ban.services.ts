import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment
import { Observable } from 'rxjs';
import { Ban } from '../_model/ban.model';

@Injectable({
  providedIn: 'root',
})
export class BanService {
  private apiUrl = environment.apiUrl; // Sử dụng URL từ environment

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(`${this.apiUrl}Ban`);
  }
}
