import { Injectable } from '@angular/core';
const COLORS: Array<string> = ['#3366FF', '#FF6633', '#33FF66', '#CC0000', '#00CC33', '#AFCACA'];

@Injectable()
export class ColorService {

  public getColorForIndex(index: number): string {
      if (COLORS.length > index) {
        return COLORS[index];
      } else {
        return 'black';
      }
  }
}
