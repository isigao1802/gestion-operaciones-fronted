import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null) {
      return '';
    }

    // Convert to string and replace commas if present
    const strValue = value.toString().replace(/,/g, '');

    // Convert to number to ensure correct formatting
    const numValue = parseFloat(strValue);

    // Format the number with thousands separators
    return numValue.toLocaleString('en-US');
  }

}
