// identida-predio.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class IdentidaPredioService {
   private identifyResultsSource = new Subject<Array<any>>();
   identifyResults$ = this.identifyResultsSource.asObservable();

   capturedInformation: any = {};

   constructor() {}

   onIdentifyTaskComplete(identifyResultsArg: Array<any>, identifyParameters: any): void {
      console.log('Identify hola:', identifyResultsArg);

      // Almacena la información capturada
      this.capturedInformation = identifyResultsArg;
      // Emitir los resultados para que los componentes suscritos los reciban
      this.identifyResultsSource.next(identifyResultsArg);

      console.log('Results emitidos al observable:', identifyResultsArg);
   }
}
