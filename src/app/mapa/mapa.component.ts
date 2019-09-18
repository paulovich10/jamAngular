import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../usuario.service';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild('googleMap', { static: false }) gMapElement: any;
  @ViewChild('inputPartida', { static: false }) inputPartidaElement: any;
  @ViewChild('inputDestino', { static: false }) inputDestinoElement: any;
  map: any;
  bounds: any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.loadMap(position.coords);
      }, this.showError);
    } else {
      console.log('La he liao parda');
    }
  }

  async loadMap(currentCoords) {

    let mapProps = {
      center: new google.maps.LatLng(currentCoords.latitude, currentCoords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP, SATELLITE, TERRAIN
    }
    this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProps);

    let marker = new google.maps.Marker({
      position: mapProps.center,
      // position: new google.maps.LatLng(40.43400290, 4.131292130),
      title: 'Aquí estoy mamá!',

    });
    marker.setMap(this.map);

    let dataMarker = await this.usuarioService.mapa();

    let bounds = new google.maps.LatLngBounds();

    for (let data of dataMarker) {
      console.log(data);
      let geocoder = new google.maps.Geocoder;

      let contentString = `<div id="content"><p><b>usuario:</b> ${data.usuario}</p><p><b>contacto:</b>${data.email}</p></div>`;
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      let loc = new google.maps.LatLng(data.partida.latitud, data.partida.longitud)
      let marker = new google.maps.Marker({

        position: loc,

      });
      marker.addListener('click', function () {
        infowindow.open(this.map, marker);
      });

      bounds.extend(loc);
      marker.setMap(this.map)

    }

    this.map.fitBounds(bounds);
    this.map.panToBounds(bounds);


  }
  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED: {
        console.log('El usuario no permite localizarle');
        break;
      }
      case error.POSITION_UNAVAILABLE: {
        console.log('La posición no está disponible');
        break;
      }
      case error.TIMEOUT: {
        console.log('Se ha terminado el tiempo de espera');
        break;
      }
      case error.UNKNOWN_ERROR: {
        console.log('Ka pachao?');
        break;
      }
    }
  }

}
