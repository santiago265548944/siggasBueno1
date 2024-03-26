import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { MemoryService } from '../../cache/memory.service';
import { jqxLoaderComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxloader';
import { ModalService } from '../../modal.module';
import { Subscription } from 'rxjs';
import { StoreProcedures } from '../../api/request/store-procedures.enum';
import { RequestHelper } from '../../api/request/request-helper';
import { InputParameter } from '../../api/request/input-parameter';
import * as moment from 'moment';
import { GlobalService } from '../../Globals/global.service';

@Component({
   selector: 'app-consultar-ordenes',
   templateUrl: './consultar-ordenes.component.html',
   styleUrls: ['./consultar-ordenes.component.css']
})
export class ConsultarOrdenesComponent implements OnInit {
   @ViewChild('jqxLoader') jqxLoader: jqxLoaderComponent;
   showModal: boolean = false;
   buscarOrden: boolean = false;
   buscarTag: boolean = false;
   numeroOrden: string = '';
   resultOrders: Array<any>;
   perfil: any;
   user: any;
   checkLegalized = 0;
   orderSelected: any;
   txtEstadoOrden: string;
   resultOrdersTag: any;
   resultCorrItems: any;
   dataPreItems: any;
   tipoOrdenCP: string;
   listaHistorialCambios: any[];
   sTasktype: any;
   causalExecute: Subscription;


   // variable para almacenar los datos de la consulta
   fechagen: any;
   fechaprog: any;
   codactppal: string;
   actppal: string;
   codcuadrilla: string;
   cuadrilla: string;
   codactgis: string;
   actgis: string;
   estado: string;
   listap: string;
   observacion: string;
   estadolegal: string;
   tipomantenimiento: string;
   tipotrabajo1: string;
   tipotrabajo2: string;
   ordenpadre: string;
   tipoelemento: string;
   fechaasig: any;
   plano: string;
   cuadrillaInter: string;
   nomcuadrillaInter: string;
   ubicacion: string;
   sector: string;
   fechaLegal: any;
   fechaIniEje: any = null;
   fechaFinEje: any = null;
   codigoerror: string;
   descripcionerror: string;
   fechaFin: any;
   fechaInicio: any;
   FechasETF: boolean = false;
   fechaVaidarTF: boolean = false;

   // Variable para almacenar el número de orden buscado
   numeroOrdenBuscada: string;

      
      constructor(private apiService: ApiService, private memoryService: MemoryService, private globals: GlobalService) {

   }

   ngOnInit(): void {
      this.setUser();
      this.listaHistorialCambios = [];
   }
   openModal() {
      this.showModal = true;
   }

   closeModal() {
      this.showModal = false;
   }
   checkBuscarOrden() {
      this.buscarOrden = true;
      this.buscarTag = false;
   }
   buscarTagElemento() {
      this.buscarTag = true;
      this.buscarOrden = false;
   }
   buscarDor() {
      if (this.buscarOrden) {
         this.buscarOrdenes(this.numeroOrden); // Llama a getOrders si buscarOrden está activo
      } else if (this.buscarTag) {
         this.getOrders(); // Llama a buscarOrdenes si buscarTag está activo
      }
   }

   buscarOrdenes(numeroOrden: string) {
      this.startProgress();
      if (this.buscarOrden && this.numeroOrden) {
         // console.log('Buscando orden...');
         // console.log('Número de orden:', this.numeroOrden);

         // Construye los parámetros para el procedimiento almacenado
         const params = [
            new InputParameter('una_orden', this.numeroOrden) // Asegúrate de que el tipo de dato sea el correcto
         ];

         this.apiService
            .callStoreProcedureV2(
               RequestHelper.getParamsForStoredProcedureV2(
                  StoreProcedures.ObtenerInfoOrdenConsult,
                  params
               )
            )
            .subscribe((response) => {
               // console.log('Respuesta del servidor:', response);

               this.fechagen = response[1];
               this.fechaprog = response[2];
               this.codactppal = response[3] + ' - ' + response[4];
               this.codcuadrilla = response[5] + '-' + response[6];
               this.codactgis = response[7] + ' - ' + response[4];
               this.estado = response[9];
               this.listap = response[10];
               this.observacion = response[11];
               this.estadolegal = response[12];
               this.tipoOrdenCP = response[13];
               this.tipotrabajo1 = response[14];
               this.sTasktype = response[15];
               this.ordenpadre = response[16];
               this.tipoelemento = response[17];
               this.fechaasig = response[18];
               this.plano = response[19];
               this.cuadrillaInter = response[20];
               this.nomcuadrillaInter = response[21];
               this.ubicacion = response[22];
               this.sector = response[23];
               this.fechaLegal = response[24];
               this.fechaIniEje = response[25];
               this.fechaFinEje = response[26];
               this.codigoerror = response[27];
               this.descripcionerror = response[28];
               console.log(this.fechaLegal);

               if (this.fechaLegal === 'null') {
                  this.fechaLegal = '';
               } else {
                  this.fechaLegal;
               }

               // Cambiar el estado de la orden según el valor recibido
               switch (response[9]) {
                  case '0':
                     this.estado = 'Registrada';
                     break;
                  case '5':
                     this.estado = 'Asignada';
                     break;
                  case '6':
                     this.estado = 'Inicio de ejecución';
                     break;
                  case '7':
                     this.estado = 'Fin de Ejecución';
                     break;
                  case '8':
                     this.estado = 'Legalizada';
                     break;
                  default:
                     this.estado = 'Estado desconocido';
                     break;
               }
               this.validarFechas();
               this.tipoOrden();
               this.Histocambioorden();
               this.stopProgress();
            });
      } else {
         alert('Debe proporcionar un número de orden válido.');
      }
   }
   Histocambioorden() {
      if (this.buscarOrden && this.numeroOrden) {
         // console.log('Buscando histo...');
         // console.log('Número de orden con histo:', this.numeroOrden);
         this.apiService
            .callStoreProcedureV2(
               RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.HistocambiosOrden, [
                  new InputParameter('una_orden', this.numeroOrden)
               ])
            )
            .subscribe((response) => {
               // console.log('Respuesta del procedimiento histocambioorden:', response);
   
               // Parsear la respuesta JSON
               try {
                  const jsonResponse = JSON.parse(response[1]);
                  const historialCambios = jsonResponse.Table1;
   
                  // Iterar sobre el array Table1 y agregar cada elemento a la lista
                  historialCambios.forEach((cambio) => {
                     // Verificar si el cambio ya existe en la lista
                     const existe = this.listaHistorialCambios.some(item => item.IDCAMBIO === cambio.IDCAMBIO);
   
                     // Si el cambio no existe en la lista, agregarlo
                     if (!existe) {
                        this.listaHistorialCambios.push({
                           IDCAMBIO: cambio.IDCAMBIO,
                           ORDEN: cambio.ORDEN,
                           FECHA: cambio.FECHA,
                           USUARIO: cambio.USUARIO,
                           MAQUINA: cambio.MAQUINA,
                           OSF_ANT: cambio.OSF_ANT,
                           OSF_NUE: cambio.OSF_NUE,
                           GIS_ANT: cambio.GIS_ANT,
                           GIS_NUE: cambio.GIS_NUE
                        });
                     }
                  });
                  // Realiza las acciones necesarias con la respuesta del procedimiento
               } catch (error) {
                  console.error('Error al parsear JSON:', error);
               }
            });
      } else {
         alert('error.');
      }
   }
   

   validarFechas() {
      // Verifica que las fechas no sean null ni undefined
      if (this.fechaIniEje !== null && this.fechaFinEje !== null &&
          this.fechaIniEje !== undefined && this.fechaFinEje !== undefined) {
          // Verifica que las fechas no sean cadenas vacías
          if (this.fechaIniEje.trim() !== '' && this.fechaFinEje.trim() !== '') {
              // Formatea las fechas
              const fechaEquipo = moment(this.fechaIniEje, 'DD-MMM-YY').format('YYYY-MM-DD');
              const fechaEquipo1 = moment(this.fechaFinEje, 'DD-MMM-YY').format('YYYY-MM-DD');
  
              this.fechaInicio = fechaEquipo;
              this.fechaFin = fechaEquipo1;
              this.fechaVaidarTF = true;
              this.FechasETF = true;
              return; // Sale del método después de validar y formatear las fechas
          }
      }
      
      // Si alguna de las condiciones anteriores no se cumple, asigna null a las fechas
      this.fechaInicio = null;
      this.fechaFin = null;
      this.fechaVaidarTF = false;
      this.FechasETF = false;
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
            // this.getOrders();
         });
   }
   getOrders() {
      // console.log('Buscando tags...');
      if (this.buscarTag && this.numeroOrden) {
         this.apiService
            .callStoreProcedureV2(
               RequestHelper.getParamsForStoredProcedureV2(
                  StoreProcedures.OrdenesMantenimientoConsulta,
                  [
                     new InputParameter('una_elemento', this.numeroOrden),
                     new InputParameter('un_estadoC', this.buscarTag),
                     new InputParameter('una_orden', this.numeroOrden),
                     new InputParameter('un_Resultado', '')
                  ]
               )
            )
            .subscribe((json) => {
               // console.log('Respuesta del procedimiento almacenado:', json);
               const orders = JSON.parse(json['2'])['Table1']; // Obtener las órdenes
               if (orders && orders.length > 0) {
                  // Procesar las órdenes
                  // console.log('Órdenes encontradas:', orders);
                  this.loadResultadoOrdenesCompleted(orders);

                  // Pintar la información en el select
                  this.resultOrders.forEach((order) => {
                     const option = document.createElement('option');
                     option.value = order.value;
                     option.textContent = order.label;
                     this.orderSelected.nativeElement.appendChild(option);
                  });
               } else {
                  alert('No se encontraron órdenes.');
               }
            });
      } else {
         console.log('La búsqueda de órdenes está desactivada.');
      }
   }

   loadResultadoOrdenesCompleted(orders: any[]) {
      // console.log('Cargando resultado de órdenes completado:', orders);
      this.resultOrders = orders.map((order) => {
         return {
            label: `${order.ORDEN} - ${order['TIPO MANTENIMIENTO']}`,
            value: order.ORDEN
         };
      });
   }
   onSelectOrder(order: any) {
      // console.log('Orden seleccionada:', this.orderSelected);

      // Aquí puedes llamar a un método para obtener y mostrar la información relacionada con el número de orden seleccionado
      this.getOrdenInfo(this.orderSelected);
   }

   getOrdenInfo(orderSelected: string) {
      this.startProgress();
      const params = [
         new InputParameter('una_orden', orderSelected) // Asegúrate de que el tipo de dato sea el correcto
      ];

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(
               StoreProcedures.ObtenerInfoOrdenConsult,
               params
            )
         )
         .subscribe((response) => {
            // console.log('Respuesta del servidor:', response);

            this.fechagen = response[1];
            this.fechaprog = response[2];
            this.codactppal = response[3] + ' - ' + response[4];
            this.codcuadrilla = response[5] + '-' + response[6];
            this.codactgis = response[7] + ' - ' + response[4];
            this.estado = response[9];
            this.listap = response[10];
            this.observacion = response[11];
            this.estadolegal = response[12];
            this.tipoOrdenCP = response[13];
            this.tipotrabajo1 = response[14];
            this.sTasktype = response[15];
            this.ordenpadre = response[16];
            this.tipoelemento = response[17];
            this.fechaasig = response[18];
            this.plano = response[19];
            this.cuadrillaInter = response[20];
            this.nomcuadrillaInter = response[21];
            this.ubicacion = response[22];
            this.sector = response[23];
            this.fechaLegal = response[24];
            this.fechaIniEje = response[25];
            this.fechaFinEje = response[26];
            this.codigoerror = response[27];
            this.descripcionerror = response[28];

            // Cambiar el estado de la orden segun el valor recibido
            switch (response[9]) {
               case '0':
                  this.estado = 'Registrada';
                  break;
               case '5':
                  this.estado = 'Asignada';
                  break;
               case '6':
                  this.estado = 'Inicio de ejecución';
                  break;
               case '7':
                  this.estado = 'Fin de Ejecución';
                  break;
               case '8':
                  this.estado = 'Legalizada';
                  break;
               default:
                  this.estado = 'Estado desconocido';
                  break;
            }
            this.tipoOrden();
            // this.getOrderTags();
            this.validarFechas();
            this.stopProgress();
         });
   }

   // Dependiendo de la orden, trae los tags que se mostrarán en la tabla elementos.
   getOrderTags() {
      let buscaNumeroOrden = this.buscarOrden ? this.numeroOrden : this.orderSelected;

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.ObtenerTagsCorrectivos, [
               new InputParameter('una_orden', buscaNumeroOrden),
            ])
         )
         .subscribe((json) => {
            // console.log('respuesta del servidor ordes', json);

            if (json && json[1]) {
               try {
                  const jsonResponse = JSON.parse(json[1]);
                  this.getOrderTagsCompleted(jsonResponse);
               } catch (error) {
                  console.error('Error al parsear JSON:', error);
               }
            } else {
               console.error('Respuesta del servidor vacía o no válida:', json);
            }
         });
   }

   getOrderTagsCompleted(jsonResult: any) {
      if (jsonResult && jsonResult.Table1 && Array.isArray(jsonResult.Table1)) {
         this.resultOrdersTag = jsonResult.Table1;
      } else {
         console.error('La respuesta JSON no contiene un array "Table1" válido:', jsonResult);
      }
   }

   getCorrItems(tipoCP: any) {
      let buscaNumeroOrden = this.buscarOrden ? this.numeroOrden : this.orderSelected;

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.ObtenerItemsCorrectivo, [
               new InputParameter('una_orden', buscaNumeroOrden),

               new InputParameter('un_tipotrabajo', tipoCP)
            ])
         )
         .subscribe((json) => {
            // console.log('respuesta del servidor Items', json);

            if (json && json[2]) {
               try {
                  const jsonResponse = JSON.parse(json[2]);
                  this.getCorrItemsCompleted(jsonResponse);
               } catch (error) {
                  console.error('Error al parsear JSON:', error);
               }
            } else {
               console.error('Respuesta del servidor vacía o no válida:', json);
            }
         });
   }

   getCorrItemsCompleted(jsonTable: any) {
      if (jsonTable && jsonTable.Table1 && Array.isArray(jsonTable.Table1)) {
         this.resultCorrItems = jsonTable.Table1;
      } else {
         console.error('La respuesta JSON no contiene un array "Table1" válido:', jsonTable);
      }
   }

   getPrevItems(preStak: any) {
      let buscaNumeroOrden = this.buscarOrden ? this.numeroOrden : this.orderSelected;

      this.apiService
         .callStoreProcedureV2(
            RequestHelper.getParamsForStoredProcedureV2(StoreProcedures.ObtenerItemsPreventivo, [
               new InputParameter('una_orden', buscaNumeroOrden),
               new InputParameter('un_tipotrabajo', preStak)
            ])
         )
         .subscribe((json) => {
            // console.log('respuesta del servidor PrevItems', json);

            if (json && json[2]) {
               try {
                  const jsonResponse = JSON.parse(json[2]);
                  this.getPrevItemsCompleted(jsonResponse);
               } catch (error) {
                  console.error('Error al parsear JSON:', error);
               }
            } else {
               console.error('Respuesta del servidor vacía o no válida:', json);
            }
         });
   }

   getPrevItemsCompleted(jsonPrevItems: any) {
      if (jsonPrevItems && jsonPrevItems.Table1) {
         this.dataPreItems = jsonPrevItems.Table1;
      } else {
         console.error(
            'La respuesta JSON no contiene una propiedad "Table1" válida:',
            jsonPrevItems
         );
      }
   }

   // Dependiendo del tipo de orden (P,C,CP) llena la tabla de correctivo, items y elementos.
   tipoOrden() {
      switch (this.tipoOrdenCP) {
         case 'P': //Preventivo
            this.getPrevItems(this.sTasktype);
            this.getCorrItems(this.sTasktype);
            this.getOrderTags();
            break;
         case 'C': //Correctivo
            this.getPrevItems(this.sTasktype);
            this.getCorrItems(this.sTasktype);
            this.getOrderTags();
            // prueba
            // this.observacion = null;
            break;
         case 'CP': //Correctivo por Preventivo
            this.getPrevItems(this.sTasktype);
            this.getCorrItems(this.sTasktype);
            this.getOrderTags();

            break;
      }
   }

   //METODO PARA ELIMINAR TODO CUANDO CIERRE EL MODAL
   clearData(): void {
      this.resultOrders = [];
      this.perfil = null;
      this.user = null;
      this.checkLegalized = 0;
      this.orderSelected = null;
      this.txtEstadoOrden = null;
      this.resultOrdersTag = null;
      this.dataPreItems = null;
      this.resultCorrItems = null;
      this.tipoOrdenCP = null;
      this.listaHistorialCambios = [];
      this.fechagen = null;
      this.fechaprog = null;
      this.codactppal = null;
      this.actppal = null;
      this.codcuadrilla = null;
      this.cuadrilla = null;
      this.codactgis = null;
      this.actgis = null;
      this.estado = null;
      this.listap = null;
      this.observacion = null;
      this.estadolegal = null;
      this.tipomantenimiento = null;
      this.tipotrabajo1 = null;
      this.tipotrabajo2 = null;
      this.ordenpadre = null;
      this.tipoelemento = null;
      this.fechaasig = null;
      this.plano = null;
      this.cuadrillaInter = null;
      this.nomcuadrillaInter = null;
      this.ubicacion = null;
      this.sector = null;
      this.fechaLegal = null;
      this.fechaIniEje = null;
      this.fechaFinEje = null;
      this.codigoerror = null;
      this.descripcionerror = null;
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
}
