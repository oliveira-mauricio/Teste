import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAllData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  getData(endpoint: string, id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  putData(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  patchData(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  deleteData(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
