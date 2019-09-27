import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../usuario.service';


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

  formProfile: FormGroup;

  coordenadas: any;

  coordenadasOrigen: any;
  coordenadasDestino: any;

  directionsService: any;
  directionsDisplay: any;

  constructor(private usuarioService: UsuarioService) {
    this.formProfile = new FormGroup({
      partida: new FormControl(''),
      destino: new FormControl(''),


    });



  }

  usuario: any;

  ngOnInit() { }

  ngAfterViewInit() {

    this.usuarioService.profile()
      .then((response) => {
        //console.log(response);
        this.usuario = response;
        //console.log(response)
        //console.log(this.usuario)

        //hemos metido en la funcion loadMap para que se cargue la carga del map antes
        this.loadMap(() => {
          if (response['origen'] && response['destino']) {
            console.log(response['origen'], response['destino'])
            let start = new google.maps.LatLng(response['origen'].latitud, response['origen'].longitud);
            let end = new google.maps.LatLng(response['destino'].latitud, response['destino'].longitud);

            // Creamos las opciones de la petición
            let opts = {
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.DRIVING
            }

            // Lanzamos la petición
            let self = this;
            this.directionsService.route(opts, function (result, status) {
              //console.log(result);
              self.directionsDisplay.setDirections(result);
            })

          }

        });

      })
  }



  loadMap(done) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    let mapProps = {
      center: new google.maps.LatLng(40.4222761, -3.7144),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,// ROADMAP, SATELLITE, TERRAIN,
      disableDefaultUI: true

    }

    this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProps);

    this.directionsDisplay.setMap(this.map);


    // AUTOCOMPLETE
    let options = {
      types: ['address']
    }
    let autocomplete = new google.maps.places.Autocomplete(this.inputPartidaElement.nativeElement, options);
    // let autocomplete = new google.maps.places.Autocomplete(document.getElementById('iPlaces'));

    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    //console.log(this.map);

    let autocompleteDestino = new google.maps.places.Autocomplete
      (this.inputDestinoElement.nativeElement, options)

    let self = this;
    autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace();
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      self.coordenadasOrigen = {
        latitud: lat,
        longitud: lng
      }
      self.map.setCenter(place.geometry.location);

      let markerPlace = new google.maps.Marker({ position: place.geometry.location, animation: google.maps.Animation.DROP })
      markerPlace.setMap(self.map);
    })

    autocompleteDestino.addListener('place_changed', function () {
      let place = autocompleteDestino.getPlace();
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      self.coordenadasDestino = {
        latitud: lat,
        longitud: lng
      }
      self.map.setCenter(place.geometry.location);

      let markerPlace = new google.maps.Marker({ position: place.geometry.location, animation: google.maps.Animation.DROP })
      markerPlace.setMap(self.map);
    })

    done();

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

  onSubmitLoc() {
    let coordenadas = {

      origen: this.coordenadasOrigen,
      destino: this.coordenadasDestino

    }

    let start = new google.maps.LatLng(this.coordenadasOrigen.latitud, this.coordenadasOrigen.longitud);
    let end = new google.maps.LatLng(this.coordenadasDestino.latitud, this.coordenadasDestino.longitud);

    // Creamos las opciones de la petición
    let opts = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    }

    // Lanzamos la petición
    let self = this;
    this.directionsService.route(opts, function (result, status) {
      //console.log(result);
      self.directionsDisplay.setDirections(result);
    })

    this.usuarioService.location(coordenadas)

      .then(response => {
        //console.log(response)
        //console.log(coordenadas)
        if (response['affectedRows'] == 1) {
          alert('ruta guardada satisfactoriamente');
          //console.log(response);

        } else if (response['error']) {
          //alert('Error en el registro. Inténtalo más tarde. 1');
          alert(response['error']);
        }

      })
      .catch(err => {
        console.log(err)
        alert('Error en el registro. Inténtalo más tarde. 2');
      });

  }



}
