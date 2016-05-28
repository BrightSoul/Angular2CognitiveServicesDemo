import { Component } from '@angular/core';
import { Face } from './face.model';
import { GenderPipe } from './gender.pipe';
import { SmilePipe } from './smile.pipe';
@Component({
    selector: 'face-item',
    inputs: ['face', 'color'],
    pipes: [GenderPipe, SmilePipe],
    template:`
        <span class="colorbox" [style.borderColor]="color" style="border: 2px solid"></span>
        <span style="font-size:20px;">{{ face.faceAttributes.gender | gender:face.faceAttributes.age }} di circa {{face.faceAttributes.age | number:'1.0-0'}} anni, {{ face.faceAttributes.smile | smile }}.</span>
   `
})
export class FaceItemComponent {
    public face: Face;
    public color: string;
}
