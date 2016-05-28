import {Pipe, PipeTransform} from '@angular/core';

const FACIAL_EXPRESSION_NAMES = [
  {value: 0.01, name: 'espressione seria'},
  {value: 0.5, name: 'espressione neutra'},
  {value: 0.999, name: 'sorridente'},
  {value: 1.0, name: 'felice'}
];
const COULD_NOT_IDENTIFY_SMILE = 'espressione incerta';
@Pipe({name: 'smile'})
export class SmilePipe implements PipeTransform {
    public transform(value: any): any {
        if (!value) {
            value = 0;
        }
        let smile = <number> value;
        for (let i = 0; i < FACIAL_EXPRESSION_NAMES.length; i++) {
            if (smile <= FACIAL_EXPRESSION_NAMES[i].value) {
                return FACIAL_EXPRESSION_NAMES[i].name;
            }
        }
        return COULD_NOT_IDENTIFY_SMILE;
    }
}
