import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/conductores'
  }

  getAll(): Promise<any> {

    return this.http.get<any>(this.baseUrl).toPromise()
  }

  create(values): Promise<any> {

    return this.http.post<any>(`${this.baseUrl}/registro`, values).toPromise();

  }





}
