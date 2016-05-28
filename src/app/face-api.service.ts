import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Face } from './face.model';

const FACE_API_DETECT_URL: string = 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile';

@Injectable()
export class FaceApiService {
    private key: string;
    public currentFaces: Subject<Array<Face>> = new BehaviorSubject<Array<Face>>(null);
    public currentPictureUrl: Subject<string> = new BehaviorSubject<string>(null);

  // Short-hand notation di parametri nel costruttore 
  // che permette di definire una proprietà privata
  constructor(private http: Http) {
  }


  public detectFaces(pictureUrl: string, key?: string): void {

      this.currentPictureUrl.next(pictureUrl);
      if (key) {
          this.key = key;
      }
      if (!this.key) {
          // Proviamo a recuperarla dal sessionStorage
          if (window && 'sessionStorage' in window) {
                this.key = sessionStorage.getItem('apiKey');
          }

          if (!this.key) {
            this.key = prompt('Inserisci la API key per il servizio Face API di Cognitive services');
            if (!this.key) {
                alert('Non è possibile continuare senza API key');
                return;
            } else {
                if (window && 'sessionStorage' in window){
                    sessionStorage.setItem('apiKey', this.key);
                }
            }
          }
      }
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Ocp-Apim-Subscription-Key', this.key);
      let args: RequestOptionsArgs = {
          method: 'post',
          body: JSON.stringify({url: pictureUrl}),
          headers: headers
      };

    let response = this.http.request(FACE_API_DETECT_URL, args);
    response.forEach((r: Response) => {
        let json = r.json();
        console.log(json);
        let results = <Array<Face>> json;
        console.log(`Trovati ${results.length} visi`);
        // Accodo il risultato corrente allo stream di eventi
        this.currentFaces.next(results);
    });
  }
}