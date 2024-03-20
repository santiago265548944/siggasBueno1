import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxDataTableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable';
import { DataSharingService } from '../../service/data-sharing.service';
import { Subscription } from 'rxjs';
import { MemoryService } from '../../cache/memory.service';
import { RequestHelper } from '../../api/request/request-helper';
import { StoreProcedures } from '../../api/request/store-procedures.enum';
import { ApiService } from '../../api/api.service';
import { InputParameter } from '../../api/request/input-parameter';

@Component({
   selector: 'app-adicionar-element',
   templateUrl: './adicionar-element.component.html',
   styleUrls: ['./adicionar-element.component.css']
})
export class AdicionarElementComponent implements OnInit {
   informacionCargadaEnTabla: boolean = false;
   selectedFeatures: any[] = [];
   resultOrders: Array<any>;
   orderSelected: any;
   user: any;
   perfil: any;
   checkLegalized = 0;

   selectedValue: any;

   constructor(
      private dataSharingService: DataSharingService,
      private apiService: ApiService,
      private memoryService: MemoryService
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
            this.setUser();
         } else {
            // Si no hay características seleccionadas, desactivar los formularios
            this.informacionCargadaEnTabla = false;
            this.selectedValue = null; // Limpiar el valor seleccionado
         }
      });
      this.dataSharingService.getSelectedSelectValue().subscribe((value) => {
         // Recibir el valor de un elemento
         if (value.toString() === '46') {
            this.selectedValue = 'TuberiaP80';
         } else {
            this.selectedValue = value;
         }
         console.log('este es el value ', this.selectedValue);
      });
   }

   private setUser() {
      this.user = this.memoryService.getItem('currentUser');
      console.log(this.user);
      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.ObtenerPerfilUsuario, [
               new InputParameter('un_id', this.user)
            ])
         )
         .subscribe((json) => {
            this.perfil = JSON.parse(json['1']);
            // console.log(this.perfil);
            this.elementosAgregar();
         });
   }

   //obtiene elementos para agregar
   private elementosAgregar() {
      if (!this.selectedValue) {
         // Si el elemento no tiene valor, desactivar el formulario o mostrar un mensaje
         this.informacionCargadaEnTabla = false;
         return;
      }

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(
               StoreProcedures.ObtenerElementosParaAgregar,
               [
                  new InputParameter('un_elemento', this.selectedValue),
                  new InputParameter('un_usuario', this.user),
                  new InputParameter('un_equipo', 'equipo_prueba'),
                  new InputParameter(
                     'un_departamento',
                     this.selectedFeatures[0].attributes.DEPARTAMENTO
                  ),
                  new InputParameter(
                     'una_localidad',
                     this.selectedFeatures[0].attributes.LOCALIDAD
                  ),
                  new InputParameter('un_codigoerror', 0),
                  new InputParameter('un_msgerror', ''),
                  new InputParameter('un_Resultado', null)
               ]
            )
         )
         .subscribe((json) => {
            console.log('Respuesta del procedimiento almacenado:', json);

            this.getOrders();
         });
   }

   // Obtiene las ordenesAsignadasporlocalidad
   private getOrders() {
      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(
               StoreProcedures.OrdenesMantenimientoConsulta,
               []
            )
         )
         .subscribe((json) => {
            console.log('Respuesta del procedimiento almacenado:', json);
            if (json[3] != null) {
               const response = JSON.parse(json[3]);
               if (response['Table1'].length === 0) {
                  this.loadResultadoOrdenesCompleted(response['Table1']);
               }
            }
         });
   }

   loadResultadoOrdenesCompleted(json: any) {
      if (json['Table1'] != null) {
         this.resultOrders = json['Table1'];
      }
   }
   agregarElementos() {
      if (!this.selectedValue || !this.orderSelected) {
         alert('Debe seleccionar un número de orden.');
         return;
      }

      console.log('selectedValue:', this.selectedValue);
      const un_departamento = this.selectedFeatures[0].attributes.DEPARTAMENTO;
      const una_localidad = this.selectedFeatures[0].attributes.LOCALIDAD;
      const tag = this.selectedFeatures[0].attributes.TAG;
      const un_tipoelemento = this.selectedValue;
      const un_una_orden = this.orderSelected.ORDEN;

      console.log('Valor de un_elemento:', un_departamento);
      console.log('Valor de un_elemento:', una_localidad);
      console.log('Valor de un_elemento:', tag);
      console.log('Valor de un_tipoelemento:', un_tipoelemento);
      console.log('Valor de un_una_Orden', un_una_orden);

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.AgregarElementosOrden, [
               new InputParameter('un_departamento', un_departamento),
               new InputParameter('una_localidad', una_localidad),
               new InputParameter('un_una_orden', un_una_orden),
               new InputParameter('un_tipoelemento', un_tipoelemento),
               new InputParameter('tag', tag),
               new InputParameter('un_codigoerror', 0), // Parámetro de salida para código de error
               new InputParameter('un_msgerror', '') // Parámetro de salida para mensaje de error
            ])
         )
         .subscribe((json) => {
            // Manejar la respuesta del procedimiento almacenado, si es necesario
            const codigoError = json['6']; // Obtener el código de error
            const msgError = json['7']; // Obtener el mensaje de error
            if (codigoError !== 0) {
               // Mostrar mensaje de error si lo deseas
               alert('Error: ' + msgError);
            } else {
               // Mostrar mensaje de éxito si lo deseas
               alert('Elementos agregados correctamente!');
            }
         });
   }
}
