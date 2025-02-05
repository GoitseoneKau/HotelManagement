import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetter',
  standalone: true
})
export class CapitalLetterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
