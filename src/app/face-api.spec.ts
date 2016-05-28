/* tslint:disable:no-unused-variable */
import { FaceApiService } from './face-api.service';
import { Face } from './face.model';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  expect, it, describe, async,
} from '@angular/core/testing';

describe("Tests", function() {

  it('should correctly parse results and add them to an observable',
    async(() =>  {
      // Preparo il MockBackend e gli altri oggetti
      // che mi occorrono per il test
      let mockBackend = new MockBackend();
      let options = new BaseRequestOptions();
      // Quando fornisco il MockBackend all servizio Http
      // le richieste web non verranno veramente inviate
      let http = new Http(mockBackend, options);
      // Questo è il servizio che voglio testare
      // effettuerà una richiesta ad un URL fornendo una API Key
      let service = new FaceApiService(http);
      // Non è importante indicare url e API key reali
      let url = 'http://foo.ext';
      let apiKey = 'Foo';
      // Mi sottoscrivo ai risultati che appariranno
      // in questo observable al termine della richiesta
      service.currentFaces.subscribe((face: Array<Face>) => {
        if (face) {
          // Verifico che il servizio abbia
          // correttamente parsato la risposta del server
          expect(face.length).toEqual(1);
          expect(face[0].faceAttributes.age).toEqual(71.0);
          expect(face[0].faceAttributes.gender).toEqual("male");
          expect(face[0].faceAttributes.smile).toEqual(0.88);
        }
      });

      // Mi registro all'apertura di connessioni
      mockBackend.connections.subscribe((conn: MockConnection) => {
        // E creo al volo il corpo di una risposta
        // così come l'avrebbe inviata il server reale
        let body = '[{"faceAttributes": { "age": 71.0, "gender": "male", "smile": 0.88 }}]';
        let responseOptions = new ResponseOptions({body: body, status: 200});
        conn.mockRespond(new Response(responseOptions));
      });

  // Ora che è tutto pronto, invoco il metodo da testare
  service.detectFaces(url, apiKey);

  }));
});

