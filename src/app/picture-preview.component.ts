import { Component } from '@angular/core';
import { Face } from './face.model';
import { FaceApiService } from './face-api.service';
import { ColorService } from './color.service';

@Component({
    selector: 'picture-preview',
    template:`
        <h2>Anteprima immagine</h2>
        <div style="display:table; position:relative;">
            <img [src]="url" *ngIf="url" />
            <div *ngFor="let face of faces; let i = index" style="position:absolute; border:2px solid" [style.borderColor]="colorService.getColorForIndex(i)" [style.top]="face.faceRectangle.top + 'px'" [style.left]="face.faceRectangle.left + 'px'" [style.width]="face.faceRectangle.width + 'px'" [style.height]="face.faceRectangle.height + 'px'">
            </div>
        </div>
   `
})
export class PicturePreviewComponent {
    private faces: Array<Face>;
    private url: string;
    constructor (private faceApiService : FaceApiService, private colorService : ColorService) {
        faceApiService.currentFaces.subscribe(currentFaces => { this.faces = currentFaces; });
        faceApiService.currentPictureUrl.subscribe(currentPictureUrl => { this.url = currentPictureUrl; });
    }
}
