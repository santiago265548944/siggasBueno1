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
   resultOrders: any[] = [];
   orderSelected: any;
   user: any;
   perfil: any;
   checkLegalized = 0;
   departamento: any;
   closeFunction: Function;

   numeroOrdenSeleccionado: any;


   selectedValue: any;

   constructor(
      private dataSharingService: DataSharingService,
      private apiService: ApiService,
      private memoryService: MemoryService
   ) {}
   ngOnInit() {
      // Suscribirse al observable del servicio DataSharingService
      this.dataSharingService.getSelectedFeaturesObservable().subscribe((features) => {
         // console.log('Datos seleccionados actualizados en otro componente:', features);

         // Verificar si hay características seleccionadas
         if (features.length > 0) {
            // Acceder a los atributos específicos (TAG, DEPARTAMENTO, LOCALIDAD) del primer feature
            const firstFeature = features[0];
            const tag = firstFeature.attributes.TAG;
            const departamento = firstFeature.attributes.DEPARTAMENTO;
            const localidad = firstFeature.attributes.LOCALIDAD;

            // Hacer algo con estos valores, si es necesario
            // console.log('TAG:', tag);
            // console.log('DEPARTAMENTO:', departamento);
            // console.log('LOCALIDAD:', localidad);

            // Guardar los features para su uso posterior si es necesario
            this.selectedFeatures = features;

            // Activar los formularios
            this.informacionCargadaEnTabla = true;

            // Cargar datos en los selects
            this.setUser();
            // this.elementosAgregar();


            // Convertir el código de departamento a su nombre correspondiente
      switch (departamento) {
         case 5:
            this.departamento = 'MAGDALENA';
            break;
         case 6:
            this.departamento = 'CESAR';
            break;
         case 9:
            this.departamento = 'BOLIVAR';
            break;
         case 2:
            this.departamento = 'ATLANTICO';
            break;
         case 22:
            this.departamento = 'HUECO';
            break;
         default:
            this.departamento = 'Departamento Desconocido';
            break;
      }
         } else {
            // Si no hay características seleccionadas, desactivar los formularios
            this.informacionCargadaEnTabla = false;
            this.selectedValue = null; // Limpiar el valor seleccionado
         }
      });
      this.dataSharingService.getSelectedSelectValue().subscribe((value) => {
         // Recibir el valor de un elemento
         if (value.toString() === '46') {
            this.selectedValue = 'TUBERIAP80';
         } else {
            this.selectedValue = value;
         }
         // console.log('este es el value ', this.selectedValue);
      });
   }

   private setUser() {
      this.user = this.memoryService.getItem('currentUser');
      // console.log(this.user);
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
         this.informacionCargadaEnTabla = false;
         return;
      }
      const elemento = this.selectedValue;
      const usuario = this.user;

      // console.log('este es el elemento',elemento);
      // console.log('este es el usuario',usuario);

      
   
      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(
               StoreProcedures.ObtenerElementosParaAgregar,
               [
                  new InputParameter('un_elemento', elemento),
                  new InputParameter('un_usuario', usuario),
                  new InputParameter('un_equipo', 0),
                  new InputParameter('un_codigoerror', 0),
                  new InputParameter('un_msgerror', 0),
               ]
            )
         )
         .subscribe((json) => {
            if (json[0] && json[0].ErrorMessage) {
               console.error('Error en el procedimiento almacenado:', json[0].ErrorMessage);
               alert('No se encontraron elementos')
               return;
            }
   
            // console.log('Respuesta del procedimiento almacenado:', json);
            this.getOrders();
         });
   }
   

   // Obtiene las ordenesAsignadasporlocalidad
   private getOrders() {
      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(
               StoreProcedures.OrdenesAsignadasPorLocalidad,
               [
                  new InputParameter('un_departameneto', this.departamento),
                  new InputParameter('una_localidad', this.selectedFeatures[0].attributes.LOCALIDAD),
                  new InputParameter('un_tipoelemento', this.selectedValue)
               ]
            )
         )
         .subscribe((json) => {
            // console.log('Respuesta del procedimiento almacenado getOrders:', json);
            if (json[3] != null) {
               const orders = JSON.parse(json['3'])['Table1']; 
               if (orders && orders.length > 0) {
                  this.loadResultadoOrdenesCompleted(orders);
                } else {
                  alert('No se encontraron órdenes.');
                }
            }
         });
   }

   loadResultadoOrdenesCompleted(orders: any[]) {
      // console.log('Respuesta completa:', orders);
      this.resultOrders = orders.map((order) => {
        return {
          label: `${order.NUMEROORDEN} - ${order['TIPO MANTENIMIENTO']}`,
          value: order.NUMEROORDEN
        };
      });
    }
    

onOrderSelected() {
  console.log('Número de orden seleccionado:', this.numeroOrdenSeleccionado);
  // Puedes utilizar this.numeroOrdenSeleccionado en tu lógica para obtener el número de orden seleccionado.
}

    
    
agregarElementos() {
   if (!this.selectedValue || !this.numeroOrdenSeleccionado) {
     alert('Debe seleccionar un número de orden.');
     return;
   }
 
   const un_departamento = this.departamento;
   const una_localidad = this.selectedFeatures[0].attributes.LOCALIDAD;
   const tag = this.selectedFeatures[0].attributes.TAG;
   const un_tipoelemento = this.selectedValue;
   const un_una_orden = this.numeroOrdenSeleccionado;
 
   this.apiService
     .callStoreProcedureV2(
       RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.AgregarElementosOrden, [
         new InputParameter('un_departamento', un_departamento),
         new InputParameter('una_localidad', una_localidad),
         new InputParameter('un_una_orden', un_una_orden),
         new InputParameter('un_tipoelemento', un_tipoelemento),
         new InputParameter('unos_tags', tag),
         new InputParameter('un_codigoerror', 0), 
         new InputParameter('un_msgerror', 0) 
       ])
     )
     .subscribe((json) => {
      // console.log('respuesta del servidor agregar elemento', json);
   
      const codigoError = json[5]; // Obtener el código de error
      const msgError = json[6]; // Obtener el mensaje de error
   
      if (codigoError !== "0") {
         // Mostrar mensaje de error si lo deseas
         alert('Error: ' + msgError);
      } else {
         // Mostrar mensaje de éxito si lo deseas
         alert('Elementos agregados correctamente!');
         this.closeFunction();
         this.ClearData();
      }
   });
 }
 ClearData(){
   this.numeroOrdenSeleccionado = null;
   this.selectedFeatures = null;
 }

}
