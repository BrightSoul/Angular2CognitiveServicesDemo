import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'picture-selector',
    outputs: ['detectFacesRequested'],
    template:`
    <div style="text-align:center;">
    <span>URL immagine</span>
        <input type="text" id="pictureUrl" #pictureUrl placeholder="Incolla l'URL di un'immagine in cui compaiono dei visi di persone" />
        <button id="pictureButton" (click)="requestDetectingFaces(pictureUrl.value)">Rileva visi</button>
    </div>
    `
})
export class PictureSelectorComponent {
    public detectFacesRequested: EventEmitter<string> = new EventEmitter<string>();

    public requestDetectingFaces(url: string): void {
        if (url) {
            this.detectFacesRequested.emit(url);
        }
    }
 }
