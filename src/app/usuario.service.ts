import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;


  constructor(private http: HttpClient, private usuarioService: UsuarioService) {

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

    //console.log(values)
    let httpOptions = this.getHeaders();
    //console.log(httpOptions);
    return this.http.get(`${this.baseUrl}/profile`, httpOptions).toPromise();

  }

  update(values): Promise<any> {
    let httpOptions = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/update`, values, httpOptions).toPromise();
  }

  location(values): Promise<any> {

    let coordenadas = {

      origenlat: values.origen.latitud,
      origenlong: values.origen.longitud,
      destinolat: values.destino.latitud,
      destinolong: values.destino.longitud

    }
    console.log(coordenadas);
    let httpOptions = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/profile/localizacion`, coordenadas, httpOptions).toPromise();

  }

  mapa(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}/mapa`).toPromise();
  }


  getHeaders() {
    return {
      headers: new HttpHeaders({
        'autorizacion': localStorage.getItem('user-token')
      })
    }
  }




}


