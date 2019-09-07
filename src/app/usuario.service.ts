import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return JSON.parse(localStorage.getItem('usuario'))["usuario"];
  }
}


