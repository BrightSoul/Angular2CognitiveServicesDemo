import {Pipe, PipeTransform} from '@angular/core';

const GENDER_NAMES_FOR_AGE = {
  'male': [ {age: 12, name: 'Bambino'}, {age: 20, name: 'Ragazzo'}, {age: 999, name: 'Uomo'} ],
  'female': [ { age: 12, name: 'Bambina'}, {age: 20, name: 'Ragazza'}, {age: 999, name: 'Donna'} ]
};
const COULD_NOT_IDENTIFY_GENDER = 'Genere non identificato';
@Pipe({name: 'gender'})
export class GenderPipe implements PipeTransform {
    public transform(value: any, age : number): any {
        if (!(value in GENDER_NAMES_FOR_AGE)){
            return COULD_NOT_IDENTIFY_GENDER;
        }
        let names = GENDER_NAMES_FOR_AGE[value];
        for (let i = 0; i < names.length; i++) {
            if (age < names[i].age) { 
                return names[i].name;
            }
        }

        return COULD_NOT_IDENTIFY_GENDER;
    }
}
