import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) {}

  register(data: RegisterReq): Observable<RegisterRes> {
    return this.http.post<RegisterRes>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginReq): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${this.baseUrl}/login`, data);
  }

  logout(data: LoginReq): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() :any{
    return localStorage.getItem('token');
  }

  revokeToken(){
    localStorage.removeItem('token');
  }

  me():  Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/user`);
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  givePermission(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/give-permission`, data);
  }

}
