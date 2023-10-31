import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxDataTableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable';
import { DataSharingService } from '../../service/data-sharing.service';
import { Subscription } from 'rxjs';
import { MemoryService } from '../../cache/memory.service';

@Component({
   selector: 'app-adicionar-element',
   templateUrl: './adicionar-element.component.html',
   styleUrls: ['./adicionar-element.component.css']
})
export class AdicionarElementComponent implements OnInit {
   @ViewChild('myDataTable') myDataTable: jqxDataTableComponent;
   orderSelected: string; // Variable para almacenar el número de orden seleccionado
   searchTerm: string; // Variable para almacenar el número de orden ingresado manualmente
   numeroDeOrdenes: string[]; // Arreglo para almacenar los números de orden
   identifyResults: any = [];
   subscription: Subscription;

   dataTableColumns: Array<any>;
   dataAdapter: any;

   elementosGuardados: any[] = [];

   constructor(
      private dataSharingService: DataSharingService,
      private memoryService: MemoryService
   ) {
      this.subscription = this.dataSharingService.getData().subscribe((data) => {
         console.log('Datos compartidos recibidos:', data);
         this.identifyResults = data;
         this.prepareDataTableColumns();
      });
   }

   ngOnInit(): void {
      this.prepareDataTableColumns();
   }

   loadTableData() {
      const tablaDatos = this.memoryService.getTablaDatos();
      this.prepareDataTableSource(tablaDatos);
   }

   filterOptions() {
      if (this.searchTerm) {
         // Si se ingresa un valor en el input, filtra el arreglo de números de orden
         this.numeroDeOrdenes = this.numeroDeOrdenes.filter((orden) =>
            orden.includes(this.searchTerm)
         );
      } else {
         // Si el input está vacío, restaura el arreglo completo
         this.loadOrdenesFromLocalStorage();
      }
   }

   // Método para cargar los números de orden desde localStorage
   loadOrdenesFromLocalStorage() {
      const ordenesRealizadas = JSON.parse(localStorage.getItem('ordenesRealizadas'));

      if (ordenesRealizadas) {
         // Extraer los números de orden de los datos almacenados
         this.numeroDeOrdenes = ordenesRealizadas.map((orden) => orden.numeroOrden);
      } else {
         // Si no hay datos en el localStorage, inicializa el arreglo vacío
         this.numeroDeOrdenes = [];
      }
   }
   GuardarElemento() {
      if (!this.orderSelected) {
         alert('Por favor, selecciona un número de orden.');
         return;
      }

      // Obtener el número de orden seleccionado
      const numeroOrden = this.orderSelected;

      // Cargar los datos de la tabla correspondientes a este número de orden
      const ordenesRealizadas = JSON.parse(localStorage.getItem('ordenesRealizadas'));
      const ordenSeleccionada = ordenesRealizadas.find(
         (orden) => orden.numeroOrden === numeroOrden
      );

      if (ordenSeleccionada && ordenSeleccionada.tablaDatos) {
         // Si se encontraron datos de la tabla, guardarlos en el almacenamiento local
         localStorage.setItem('numeroOrdenSeleccionado', numeroOrden);
         localStorage.setItem('tablaDatos', JSON.stringify(ordenSeleccionada.tablaDatos));
         alert('Número de orden y datos de la tabla guardados satisfactoriamente.');
      } else {
         // Si no se encontraron datos de la tabla, mostrar un mensaje de error
         alert('No se encontraron datos de la tabla para el número de orden seleccionado.');
      }

      // Limpia el campo de búsqueda
      this.searchTerm = '';
      this.orderSelected = '';
   }
   agregarElementos() {
      if (!this.orderSelected) {
         alert('Por favor, selecciona un número de orden.');
         return;
      }

      // Obtener el número de orden seleccionado
      const numeroOrden = this.orderSelected;

      // Cargar los datos de la tabla correspondientes a este número de orden
      const ordenesRealizadas = JSON.parse(localStorage.getItem('ordenesRealizadas'));
      const ordenSeleccionada = ordenesRealizadas.find(
         (orden) => orden.numeroOrden === numeroOrden
      );

      if (ordenSeleccionada && ordenSeleccionada.tablaDatos) {
         // Si se encontraron datos de la tabla, cargarlos
         this.prepareDataTableSource(ordenSeleccionada.tablaDatos);
      } else {
         // Si no se encontraron datos de la tabla, mostrar un mensaje de error
         alert('No se encontraron datos de la tabla para el número de orden seleccionado.');
      }
   }

   prepareDataTableColumns(): void {
      this.dataTableColumns = [
         { text: 'Capa', dataField: 'layerName', width: 200 },
         { text: 'Valor', dataField: 'value', width: 200 }
      ];
   }

   // Prepara los datos para la tabla basados en los objetos feature
   prepareDataTableSource(features: any[]): void {
      const localData = [];
      for (const feature of features) {
         localData.push({ layerName: feature.layerName, value: feature.value });
      }

      const source = {
         datatype: 'array',
         dataFields: [
            { name: 'layerName', type: 'string' },
            { name: 'value', type: 'string' }
         ],
         localdata: localData
      };

      this.dataAdapter = new jqx.dataAdapter(source);
   }
}
