import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConversion',
  standalone: true,
})
export class TempConversionPipe implements PipeTransform {
  //* toggle temp unit type (not needed as the api provide it )
  transform(value: number, unit: string): number | null {
    if (value && !isNaN(value)) {
      if (unit === 'C') {
        const newVal = ((value - 32) * 5) / 9;

        return parseFloat(newVal.toFixed(1));
      } else if (unit === 'F') {
        return value;
      }
    }
    return null;
  }
}
