import {
   ChangeDetectorRef,
   EventEmitter,
   Component,
   NgZone,
   OnInit,
   Output,
   ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { jqxLoaderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxloader';
import { jqxDataTableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable';
import { RequestHelper } from '../../api/request/request-helper';
import { StoreProcedures } from '../../api/request/store-procedures.enum';
import { ApiService } from '../../api/api.service';
import { MemoryService } from '../../cache/memory.service';
import { DataSharingService } from '../../service/data-sharing.service';
import { IdentidaPredioService } from '../../service/IdentidaPredio.service';
import { jqxTabsComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtabs';
import { InputParameter } from '../../api/request/input-parameter';

@Component({
   selector: 'app-generar-correct',
   templateUrl: './generar-correct.component.html',
   styleUrls: ['./generar-correct.component.css']
})
export class GenerarCorrectComponent implements OnInit {
   @ViewChild('jqxLoader') jqxLoader: jqxLoaderComponent;
   @ViewChild('tabsElement') jqxTabs: jqxTabsComponent;
   @Output() closed = new EventEmitter<void>();

   selectedTipoActividad: any;
   selectedActividad: any;
   selectedActividadOSF: any;
   activity: Array<any>;
   tipoactivity: Array<any>;
   user: any;
   perfil: any;
   buscarTipo: any;
   comentario: any;
   comentarioID: any = null;
   observacion: any = null;
   confirmacionPop: any;
   buscarActividad: any;
   orden: any;
   confirmacion: number;
   observable: any;
   subscription: Subscription;
   identifyResults: any;
   sharedData: any[] = [];
   lastOrderId: number = 0;

   asociarDireccion: boolean = false;

   informacionCargadaEnTabla: boolean = false;
   // identidadPredio
   input1Value: string;
   input2Value: string;
   capturedInformation: any[] = [];
   selectedFeatures: any[] = [];

   selectedValue: any;

   constructor(
      private apiService: ApiService,
      private memoryService: MemoryService,
      private dataSharingService: DataSharingService,
      private identidaPredioService: IdentidaPredioService
   ) {}

   ngOnInit() {
      // Suscribirse al observable del servicio DataSharingService
      this.dataSharingService.getSelectedFeaturesObservable().subscribe((features) => {
         console.log('Datos seleccionados actualizados en otro componente:', features);

         // Verificar si hay características seleccionadas
         if (features.length > 0) {
            // Acceder a los atributos específicos (TAG, DEPARTAMENTO, LOCALIDAD) del primer feature
            const firstFeature = features[0];
            const tag = firstFeature.attributes.TAG;
            const departamento = firstFeature.attributes.DEPARTAMENTO;
            const localidad = firstFeature.attributes.LOCALIDAD;

            // Hacer algo con estos valores, si es necesario
            console.log('TAG:', tag);
            console.log('DEPARTAMENTO:', departamento);
            console.log('LOCALIDAD:', localidad);

            // Guardar los features para su uso posterior si es necesario
            this.selectedFeatures = features;

            // Activar los formularios
            this.informacionCargadaEnTabla = true;

            // Cargar datos en los selects
            this.loadDropDownTipoActivity();
            this.loadDropDownActivity();
         } else {
            // Si no hay características seleccionadas, desactivar los formularios
            this.informacionCargadaEnTabla = false;
         }
      });
      this.dataSharingService.getSelectedSelectValue().subscribe((value) => {
         // Recibir y asignar el valor del select
         if (value.toString() === '46') {
            this.selectedValue = 'TuberiaP80';
         } else {
            this.selectedValue = value;
         }
         console.log('este es el value ', this.selectedValue);
      });

      // Suscribirse al observable del servicio IdentidaPredioService
      this.identidaPredioService.identifyResults$.subscribe((results) => {
         this.capturedInformation = results;

         // Puedes realizar cualquier acción adicional con la información capturada aquí
         this.procesarInformacionCapturada();
      });
   }

   // Puedes definir métodos adicionales según sea necesario
   private procesarInformacionCapturada() {
      // Realiza acciones adicionales con la información capturada
      console.log('Información capturada:', this.capturedInformation);

      // Ejemplo: Acceder a la etiqueta del primer elemento del array
      if (this.capturedInformation && this.capturedInformation.length > 0) {
         const etiquetaValue = this.capturedInformation[0].feature.attributes.OBJECTID;
         const etiquetaDIRECCION = this.capturedInformation[0].feature.attributes.DIRECCION;

         console.log('Valor de ETIQUETA:', etiquetaValue, etiquetaDIRECCION);
      }
   }
   private actualizarInformacionCuadro(selectedFeatures: any[]): void {
      // Actualizar la información en el cuadro con los features seleccionados
      this.selectedFeatures = selectedFeatures;
   }

   ngOnDestroy(): void {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }
   limpiarInformacion(): void {
      this.selectedActividad = null;
      this.selectedTipoActividad = null;
      this.observacion = '';
      this.observable = '';
      this.selectedFeatures = [];
      this.capturedInformation = [];
   }

   private checkIdentificationStatus(): void {
      if (this.identifyResults) {
         // Puedes agregar lógica aquí si es necesario
      } else {
         this.selectedActividad = null;
         this.selectedTipoActividad = null;
      }
   }

   private loadDropDownTipoActivity(): void {
      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.ObtenerTiposdeActividad, [])
         )
         .subscribe((json) => {
            if (json[0] != null) {
               this.loadDropDownTipoActivityCompleted(JSON.parse(json[0]));
            }
         });
   }

   private loadDropDownTipoActivityCompleted(json: any): void {
      if (json['Table1'] != null) {
         this.tipoactivity = json['Table1'];
      }
   }

   private loadDropDownActivity(): void {
      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.ObtenerActividades, [
               new InputParameter('un_tipo', this.selectedTipoActividad),
               new InputParameter('un_usario', this.user)
            ])
         )
         .subscribe((json) => {
            if (json[0] != null) {
               this.loadDropDownActivityCompleted(JSON.parse(json[0]));
            }
         });
   }

   private loadDropDownActivityCompleted(json: any): void {
      if (json['Table1'] != null) {
         this.activity = json['Table1'];
      }
   }

   private startProgress(): void {
      if (this.jqxLoader) {
         this.jqxLoader.open();
      }
   }

   private stopProgress(): void {
      if (this.jqxLoader) {
         this.jqxLoader.close();
      }
   }

   Agregar() {
      if (!this.validarFormulario()) {
         return;
      }
      if (this.selectedActividad) {
         if (this.observacion !== null) {
            this.observacion += '\n';
         } else {
            this.observacion = '';
         }
         this.observacion += this.selectedActividad.DESCRIPCION;
      }
   }

   Remover() {
      this.observacion = '';
      this.observable = '';
      this.selectedFeatures = [];
      this.capturedInformation = [];
   }

   Cancelar() {
      const confirmacion = confirm('¿Estás seguro de que deseas cancelar?');

      if (confirmacion) {
         this.selectedActividad = '';
         this.selectedTipoActividad = '';
      }
   }

   // generarOrden() {
   //    if (typeof localStorage === 'undefined') {
   //       alert('El almacenamiento local no está disponible en este navegador.');
   //       return;
   //    }

   //    const actividadSeleccionada = this.selectedActividad
   //       ? this.selectedActividad.DESCRIPCION
   //       : '';
   //    const observable = String(this.observable);

   //    if (!actividadSeleccionada || !observable) {
   //       alert('Debes completar los campos.');
   //       return;
   //    }

   //    const ordenGenerada = this.generarNumeroOrden().toString();

   //    this.lastOrderId++;
   //    const currentDate = new Date();
   //    const dateString = currentDate.toLocaleDateString();

   //    const firstFeature = this.selectedFeatures[0];
   //    const tag = firstFeature ? firstFeature.attributes.TAG : '';
   //    const departamento = firstFeature ? firstFeature.attributes.DEPARTAMENTO : '';
   //    const localidad = firstFeature ? firstFeature.attributes.LOCALIDAD : '';

   //    if (tag && departamento && localidad) {
   //       this.memoryService.setItem('tag', tag);
   //       this.memoryService.setItem('departamento', departamento);
   //       this.memoryService.setItem('localidad', localidad);
   //    }

   //    this.memoryService.setItem('actividadSeleccionada', actividadSeleccionada);
   //    this.memoryService.setItem('observacion', observable);
   //    this.memoryService.setItem('numeroOrden', ordenGenerada);
   //    this.memoryService.setItem('estadoOrden', 'Registrada');

   //    let ordenesRealizadas = JSON.parse(localStorage.getItem('ordenesRealizadas')) || [];

   //    ordenesRealizadas.push({
   //       id: this.lastOrderId,
   //       numeroOrden: ordenGenerada,
   //       actividad: actividadSeleccionada,
   //       observacion: observable,
   //       fecha: dateString,
   //       estadoOrden: 'Registrada',
   //       tag: tag,
   //       departamento: departamento,
   //       localidad: localidad
   //    });

   //    localStorage.setItem('ordenesRealizadas', JSON.stringify(ordenesRealizadas));

   //    alert(`Orden generada: ${ordenGenerada}`);

   //    this.selectedActividad = null;
   //    this.selectedTipoActividad = null;
   //    this.observacion = '';
   //    this.observable = '';
   //    this.selectedFeatures = [];
   //    this.capturedInformation = [];

   //    this.closed.emit();
   // }

   // generarNumeroOrden() {
   //    const numeroOrden = Math.floor(100000 + Math.random() * 900000);
   //    return numeroOrden;
   // }
   private validarFormulario(): boolean {
      if (!this.observable || this.observable.trim() === '') {
         alert('El campo de OBSERVACIÓN es obligatorio.');
         return false;
      }
      return true;
   }
   generarOrden() {
      // Verificar si hay elementos seleccionados
      if (
         !this.selectedActividad ||
         !this.selectedTipoActividad ||
         !this.selectedFeatures ||
         !this.selectedValue
      ) {
         alert('Por favor seleccione todos los elementos necesarios para generar la orden.');
         return;
      }
      const una_actividad_gis = this.selectedActividad.CODIGO;
      const una_actividad = this.selectedTipoActividad.CODIGO;
      const una_observacion = this.observable;
      const un_elemento = this.selectedValue.toString();
      const tags = this.selectedFeatures[0].attributes.TAG;
      const un_departamento = this.selectedFeatures[0].attributes.DEPARTAMENTO;
      const una_localidad = this.selectedFeatures[0].attributes.LOCALIDAD;

      console.log('una_actividad_gis:', una_actividad_gis);
      console.log('una_actividad:', una_actividad);
      console.log('tags:', tags);
      console.log('un_elemento:', un_elemento);
      console.log('una_observacion:', una_observacion);
      console.log('un_departamento:', un_departamento);
      console.log('una_localidad:', una_localidad);

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.GenerarOrdenCorrectivo, [
               new InputParameter('una_actividad_gis', una_actividad_gis),
               new InputParameter('una_actividad', una_actividad),
               new InputParameter('tags', tags.toString()),
               new InputParameter('un_elemento', un_elemento),
               new InputParameter('una_observacion', una_observacion),
               new InputParameter('un_departamento', un_departamento),
               new InputParameter('una_localidad', una_localidad),
               new InputParameter('ionuorderid', { type: 'out', value: null }),
               new InputParameter('onuerrorcode', { type: 'out', value: null }),
               new InputParameter('osberrormessage', { type: 'out', value: null })
            ])
         )
         .subscribe((response) => {
            console.log('respuesta del procedimiento', response);
            if (response && response.length > 0) {
               const result = response[0];
               const errorCode = result['onuerrorcode'];
               const errorMessage = result['osberrormessage'];

               if (errorCode === 0) {
                  const ordenId = result['ionuorderid'];
                  if (ordenId) {
                     alert(`Orden generada exitosamente. Número de orden: ${ordenId}`);
                  } else {
                     alert('La orden no pudo ser generada correctamente.');
                  }

                  // Resto de la lógica para limpiar el formulario y emitir el evento de cerrar
                  this.selectedActividad = null;
                  this.selectedTipoActividad = null;
                  this.observacion = '';
                  this.observable = '';
                  this.selectedFeatures = [];
                  this.capturedInformation = [];

                  this.closed.emit();
               } else {
                  alert(`Error generando la orden: ${errorMessage}`);
               }
            } else {
               alert('Error en la respuesta del servidor');
            }
         });
   }

   // onSelectChange(event: any): void {
   //    this.dataSharingService.setSelectChangeFunction(event);
   // }
}
