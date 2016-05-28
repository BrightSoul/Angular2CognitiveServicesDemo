import { Component } from '@angular/core';
import { Face } from './face.model';
import { FaceApiService } from './face-api.service';
import { FaceItemComponent } from './face-item.component';
import { ColorService } from './color.service';

@Component({
    selector: 'face-list',
    directives: [FaceItemComponent],
    template:`
        <h2>Visi rilevati</h2>
        <ul style="list-style-type:none; padding:0; margin:0;">
            <li *ngFor="let face of faces; let i = index" style="padding:10px; border-bottom:1px solid lightgray">
                <face-item [face]="face" [color]="colorService.getColorForIndex(i)"></face-item>
            </li>
        </ul>`
})
export class FaceListComponent {
    private faces : Array<Face>;
    constructor (private faceApiService : FaceApiService, private colorService : ColorService) {
        faceApiService.currentFaces.subscribe(currentFaces => { this.faces = currentFaces; });
    }
}