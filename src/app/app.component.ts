import {Component} from '@angular/core';
import {PictureSelectorComponent} from './picture-selector.component';
import {PicturePreviewComponent} from './picture-preview.component';
import {FaceListComponent} from './face-list.component';
import {FaceApiService} from './face-api.service';
import {ColorService} from './color.service';
@Component({
    selector: 'my-app',
    directives: [PictureSelectorComponent, PicturePreviewComponent, FaceListComponent],
    providers: [FaceApiService, ColorService],
    template: `<h1>Angular 2 / Microsoft Cognitive Services demo app</h1>
    <div><picture-selector (detectFacesRequested)="detectFaces($event)"></picture-selector></div>
    <div style="margin-top:20px;">
        <div style="float:left"><picture-preview></picture-preview></div>
        <div style="float:right"><face-list></face-list></div>
    </div>
    `
})
export class AppComponent {

    constructor(private faceApiService: FaceApiService){
    }

    public detectFaces(pictureUrl: string): void {
        this.faceApiService.detectFaces(pictureUrl);
    }

 }
