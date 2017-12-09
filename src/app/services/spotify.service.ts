import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas: any[] = [];

  urlSpotify: string = 'https://api.spotify.com/v1/';

  token: string = 'BQDWwF_rEir9oIFUXlG_tWK7u8qIs5LnOkCDyJJJ8ZlP2XrilpnCfu60khIBFr6fZnG6h7qs4NCcd4tW2Vk';

  constructor(public httpClient: HttpClient) {
    console.log('Servicio Spotify listo!');
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return headers;
  }

  getArtista(id: string) {

    let url = `${this.urlSpotify}artists/${id}`;

    let headers = this.getHeaders();

    return this.httpClient.get(url, {headers});

  };

  getTop(id: string){
    let url = `${this.urlSpotify}artists/${id}/top-tracks?country=US`;

    let headers = this.getHeaders();

    return this.httpClient.get(url, {headers});
  }

  getArtistas(termino: string) {

    let url = `${this.urlSpotify}search?query=${termino}&type=artist&limit=20`;

    let headers = this.getHeaders();

    return this.httpClient.get(url, {headers})
      .map((resp: any) => {
        this.artistas = resp.artists.items;
        return this.artistas;
      });

  }

}