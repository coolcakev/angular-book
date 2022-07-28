import { Pipe, PipeTransform } from '@angular/core';
import {pathToImageFolder} from "../constants"
@Pipe({
  name: 'urlForPhoto'
})
export class UrlForPhotoPipe implements PipeTransform {

  transform(fileName: string, args?: any): string {
    return `${pathToImageFolder}/${fileName}`;
  }

}
