import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  login(values) {
    return this.http.post(`${this.baseUrl}/login`, values).toPromise();
  }



  isUserLogged() {
    if (localStorage.getItem('user-token')) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    return localStorage.getItem('username');
  }

  profile() {
    let httpOptions = this.getHeaders();
    console.log(httpOptions);
    return this.http.get(`${this.baseUrl}/profile`, httpOptions).toPromise();

  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'autorizacion': localStorage.getItem('user-token')
      })
    }
  }


}


