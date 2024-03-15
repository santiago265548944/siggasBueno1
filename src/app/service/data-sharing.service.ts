// data-sharing.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class DataSharingService {
   private selectedFeatures: any[] = [];
   private selectedFeaturesSubject = new Subject<any[]>();
   private selectedLayerInfo: any = null;
   private selectedLayerInfoSubject = new Subject<any>();
   private selectChangeFunction: any = null;
   private selectChangeFunctionSubject = new Subject<any>();
   private selectValueSubject = new Subject<any>();

   getSelectedFeatures(): any[] {
      return this.selectedFeatures;
   }

   setSelectedFeatures(features: any[]): void {
      this.selectedFeatures = features;
      this.selectedFeaturesSubject.next(features);
      console.log('Datos seleccionados actualizados:', features);
   }

   getSelectedFeaturesObservable(): Observable<any[]> {
      return this.selectedFeaturesSubject.asObservable();
   }

   getSelectedLayerInfo(): any {
      return this.selectedLayerInfo;
   }

   setSelectedLayerInfo(layerInfo: any): void {
      this.selectedLayerInfo = layerInfo;
      this.selectedLayerInfoSubject.next(layerInfo);
      console.log('Información de la capa seleccionada actualizada:', layerInfo);
   }

   getSelectedLayerInfoObservable(): Observable<any> {
      return this.selectedLayerInfoSubject.asObservable();
   }

   getSelectChangeFunction(): any {
      return this.selectChangeFunction;
   }

   setSelectChangeFunction(func: any): void {
      this.selectChangeFunction = func;
      this.selectChangeFunctionSubject.next(func);
      console.log('Función de cambio del select actualizada:', func);
   }

   getSelectChangeFunctionObservable(): Observable<any> {
      return this.selectChangeFunctionSubject.asObservable();
   }
   setSelectedSelectValue(value: any): void {
      this.selectValueSubject.next(value);
   }

   getSelectedSelectValue(): Observable<any> {
      return this.selectValueSubject.asObservable();
   }
}
