import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Response } from 'selenium-webdriver/http';
import { User } from '../models/user.model';

declare var google;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  @ViewChild('googleMap', { static: false }) gMapElement: any;
  @ViewChild('inputPartida', { static: false }) inputPartidaElement: any;
  @ViewChild('inputDestino', { static: false }) inputDestinoElement: any;
  map: any;
  formulario: FormGroup;

  directionsService: any;
  directionsDisplay: any;

  constructor(private usuarioService: UsuarioService) { }

  usuario: any;

  ngOnInit() {

    this.usuarioService.profile()
      .then((response) => {
        console.log(response);
        this.usuario = response;


      })




    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.loadMap(position.coords)
      }, this.showError)
    } else {

      console.log('no hay geolocalización');
    }
  }

  loadMap(currentCoords) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    let mapProps = {
      center: new google.maps.LatLng(currentCoords.latitude, currentCoords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP, SATELLITE, TERRAIN
    }

    this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProps);

    this.directionsDisplay.setMap(this.map);

    let marker = new google.maps.Marker({
      position: mapProps.center,
      // position: new google.maps.LatLng(40.43400290, 4.131292130),
      title: 'Aquí estoy mamá!',

    });
    marker.setMap(this.map);


    // AUTOCOMPLETE
    let options = {
      types: ['address']
    }
    let autocomplete = new google.maps.places.Autocomplete(this.inputPartidaElement.nativeElement, options);
    // let autocomplete = new google.maps.places.Autocomplete(document.getElementById('iPlaces'));

    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    console.log(this.map);

    let autocompleteDestino = new google.maps.places.Autocomplete
      (this.inputDestinoElement.nativeElement, options)

    let self = this;
    autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace();
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      self.map.setCenter(place.geometry.location);

      let markerPlace = new google.maps.Marker({ position: place.geometry.location, animation: google.maps.Animation.DROP })
      markerPlace.setMap(self.map);
    })

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
