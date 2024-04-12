import {
  ChangeDetectorRef,
  EventEmitter,
  Component,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { jqxLoaderComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxloader";
import { jqxDataTableComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxdatatable";
import { RequestHelper } from "../../api/request/request-helper";
import { StoreProcedures } from "../../api/request/store-procedures.enum";
import { ApiService } from "../../api/api.service";
import { MemoryService } from "../../cache/memory.service";
import { DataSharingService } from "../../service/data-sharing.service";
import { IdentidaPredioService } from "../../service/IdentidaPredio.service";
import { jqxTabsComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxtabs";
import { InputParameter } from "../../api/request/input-parameter";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-generar-correct",
  templateUrl: "./generar-correct.component.html",
  styleUrls: ["./generar-correct.component.css"],
})
export class GenerarCorrectComponent implements OnInit {
  @ViewChild("jqxLoader") jqxLoader: jqxLoaderComponent;
  @ViewChild("tabsElement") jqxTabs: jqxTabsComponent;
  @Output() closed = new EventEmitter<void>();

  selectedTipoActividad: any;
  selectedActividad: any;
  selectedActividadOSF: any;
  activity: Array<any>;
  tipoactivity: Array<any>;
  activityOsf: Array<any>;
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
  departamento: any;
  closeFunction: Function;
  selectedId: string;
  resultCorrItems: any;

  asociarDireccion: boolean = false;
  capturarLayerId: boolean = false;
  showSpinner: boolean = false;

  informacionCargadaEnTabla: boolean = false;
  // identidadPredio
  input1Value: string;
  input2Value: string;
  capturedInformation: any[] = [];
  selectedFeatures: any[] = [];

  selectedValue: any;
  multiple: string;

  constructor(
    private apiService: ApiService,
    private memoryService: MemoryService,
    private dataSharingService: DataSharingService,
    private identidaPredioService: IdentidaPredioService
  ) {}

  ngOnInit() {
    // Suscribirse al observable del servicio DataSharingService
    this.dataSharingService
      .getSelectedFeaturesObservable()
      .subscribe((features) => {
        console.log(
          "Datos seleccionados actualizados en otro componente:",
          features
        );

        // Verificar si hay características seleccionadas
        if (features.length > 0) {
          // Acceder a los atributos específicos (TAG, DEPARTAMENTO, LOCALIDAD) del primer feature
          const firstFeature = features[0];
          const tag = firstFeature.attributes.TAG;
          const departamento = firstFeature.attributes.DEPARTAMENTO;
          const localidad = firstFeature.attributes.LOCALIDAD;

          // Hacer algo con estos valores, si es necesario
          console.log("TAG:", tag);
          console.log("DEPARTAMENTO:", departamento);
          console.log("LOCALIDAD:", localidad);

          // Guardar los features para su uso posterior si es necesario
          this.selectedFeatures = features;

          // Activar los formularios
          this.informacionCargadaEnTabla = true;

          this.setUser();
          this.getActivityTypes();
          this.getCorrectiveTags();

          // this.getSystemInfo();

          // this.textEdit1();

          // Convertir el código de departamento a su nombre correspondiente
          switch (departamento) {
            case 5:
              this.departamento = "MAGDALENA";
              break;
            case 6:
              this.departamento = "CESAR";
              break;
            case 9:
              this.departamento = "BOLIVAR";
              break;
            case 2:
              this.departamento = "ATLANTICO";
              break;
            case 22:
              this.departamento = "HUECO";
              break;
            default:
              this.departamento = "Departamento Desconocido";
              break;
          }
        } else {
          // Si no hay características seleccionadas, desactivar los formularios
          this.informacionCargadaEnTabla = false;
        }
      });
    this.dataSharingService.getSelectedSelectValue().subscribe((value) => {
      // console.log('este es el ID ', value);

      this.selectedId = value.toString();
      // Recibir y asignar el valor del select
      if (value.toString() === "46") {
        this.selectedValue = "TUBERIAP80";
      } else if (value.toString() === "29") {
        this.selectedValue = "VALVULA";
      } else {
        this.selectedValue = value;
      }
      console.log("este es el value ", this.selectedValue);
    });

    // Suscribirse al observable del servicio IdentidaPredioService
    this.identidaPredioService.identifyResults$.subscribe((results) => {
      this.capturedInformation = results;

      // Puedes realizar cualquier acción adicional con la información capturada aquí
      this.procesarInformacionCapturada();
    });
  }

  private procesarInformacionCapturada() {
    // Realiza acciones adicionales con la información capturada
    console.log("Información capturada:", this.capturedInformation);

    // Ejemplo: Acceder a la etiqueta del primer elemento del array
    if (this.capturedInformation && this.capturedInformation.length > 0) {
      const etiquetaValue =
        this.capturedInformation[0].feature.attributes.OBJECTID;
      const etiquetaDIRECCION =
        this.capturedInformation[0].feature.attributes.DIRECCION;
      const layerId = this.capturedInformation[0].feature.attributes.OBJECTID;

      console.log(
        "Valor de ETIQUETA:",
        etiquetaValue,
        etiquetaDIRECCION,
        layerId
      );
    }
  }
  capturarLayerIdOnChange(event: any): void {
    this.capturarLayerId = event.target.checked;
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
    this.observacion = "";
    this.observable = "";
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
  private setUser() {
    this.user = this.memoryService.getItem("currentUser");
    // console.log(this.user);
    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.ObtenerPerfilUsuario,
          [new InputParameter("un_id", this.user)]
        )
      )
      .subscribe((json) => {
        this.perfil = JSON.parse(json["1"]);
      });
  }

  private getActivityTypes(): void {
    this.startProgress();
    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.ObtenerTiposdeActividad,
          []
        )
      )
      .subscribe((json) => {
        if (json[0] != null) {
          this.loadDropDownTipoActivityCompleted(JSON.parse(json[0]));
        }
        this.activityTypeLookUpEdit();
        this.stopProgress();
      });
  }

  private loadDropDownTipoActivityCompleted(json: any): void {
    if (json["Table1"] != null) {
      this.tipoactivity = json["Table1"];
    }
  }

  public activityTypeLookUpEdit(): void {
    const tipoactividad = this.selectedTipoActividad.CODIGO;
    this.showSpinner = true;

    // console.log('valor tipoactividad', tipoactividad);

    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.ObtenerCorrectivosPorTipo,
          [new InputParameter("un_tipo", tipoactividad)]
        )
      )
      .subscribe((json) => {
        // console.log('actividad', json);

        if (json[1] != null) {
          this.loadDropDownActivityCompleted(JSON.parse(json[1]));
        }
        this.activityLookUpEdit();

        this.showSpinner = false;
      });
  }

  private loadDropDownActivityCompleted(json: any): void {
    if (json["Table1"] != null) {
      this.activity = json["Table1"];
    }
  }

  private getCorrectiveTags(): void {
    const elemento = String(this.selectedValue).toUpperCase();
    const user = this.memoryService.getItem("currentUser").toUpperCase();
    const osName = "SIGGASWEB";

    console.log(elemento);
    console.log(user);
    console.log(osName);

    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.ObtenerTagsCorrectivo,
          [
            new InputParameter("un_elemento", elemento),
            new InputParameter("un_usuario", user),
            new InputParameter("un_equipo", osName),
          ]
        )
      )
      .subscribe((json) => {
        console.log("respuesta del elemento", json);

        if (json && json[3]) {
          try {
            const jsonResponse = JSON.parse(json[3]);
            this.getCorrItemsCompleted(jsonResponse);
          } catch (error) {
            console.error("Error al parsear JSON:", error);
          }
        } else {
          console.error("Respuesta del servidor vacía o no válida:", json);
        }
      });
  }

  getCorrItemsCompleted(jsonTable: any) {
    if (jsonTable && jsonTable.Table1 && Array.isArray(jsonTable.Table1)) {
      this.resultCorrItems = jsonTable.Table1;
    } else {
      console.error(
        'La respuesta JSON no contiene un array "Table1" válido:',
        jsonTable
      );
    }
  }
  public activityLookUpEdit(): void {
    const ACTIVDAD = this.selectedActividad.OSFTIPOTRABAJO;
    this.showSpinner = true;

    // console.log('VALOR ACTIVIDAD', ACTIVDAD);

    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.ObtenerActividadPpalPorTrabajo,
          [new InputParameter("un_tipotrabajo", ACTIVDAD)]
        )
      )
      .subscribe((json) => {
        //   console.log('actividad osf', json);

        if (json[1] != null) {
          this.loadDropDownActivityOsd(JSON.parse(json[1]));
        }
        this.showSpinner = false;
      });
  }

  private loadDropDownActivityOsd(json: any): void {
    if (json["Table1"] != null) {
      this.activityOsf = json["Table1"];
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
    if (this.selectedActividadOSF) {
      if (this.observacion !== null) {
        this.observacion += "\n";
      } else {
        this.observacion = "";
      }
      this.observacion += this.selectedActividadOSF.DESCRIPCION;
    }
  }

  Remover() {
    // Limpiar variables y arrays
    this.selectedActividad = null;
    this.selectedActividadOSF = null;
    this.selectedTipoActividad = null;
    this.observacion = "";
    this.observable = "";
    this.selectedFeatures = [];
    this.capturedInformation = [];

    // Restablecer el estado del formulario
    this.informacionCargadaEnTabla = false;
  }

  Cancelar() {
    const confirmacion = confirm("¿Estás seguro de que deseas cancelar?");

    if (confirmacion) {
      this.selectedActividadOSF = "";
      this.selectedTipoActividad = "";
      this.closeFunction();
    }
  }

  private validarFormulario(): boolean {
    if (!this.observable || this.observable.trim() === "") {
      alert("El campo de OBSERVACIÓN es obligatorio.");
      return false;
    }
    return true;
  }

  generarOrden() {
    if (
      !this.selectedActividad ||
      !this.selectedTipoActividad ||
      !this.selectedFeatures ||
      !this.selectedValue
    ) {
      alert(
        "Por favor seleccione todos los elementos necesarios para generar la orden."
      );
      return;
    }
    // this.ValidarElementoSitieneOrden();

    if (!this.ValidarElementoSitieneOrden) {
      return;
    }

    // const actividadgis = this.selectedTipoActividad.CODIGO;
    const actividadgis = parseFloat(this.selectedActividad.CODIGO);
    const actividad = parseFloat(this.selectedActividad.CODIGO);
    const abservacion = String(this.observable);
    const elemento = String(this.selectedValue);
    const tags = String(this.selectedFeatures[0].attributes.TAG);
    const departamento = parseFloat(
      this.selectedFeatures[0].attributes.DEPARTAMENTO
    );
    const localidad = parseFloat(this.selectedFeatures[0].attributes.LOCALIDAD);
    const guid = String(uuidv4());

    // const layerId = parseFloat(this.capturedInformation[0].layerId);

    console.log("UN_GUID:", guid);
    console.log("una_actividad_gis:", actividadgis);
    console.log("una_actividad:", actividad);
    console.log("tags:", tags);
    console.log("un_elemento:", elemento);
    console.log("una_observacion:", abservacion);
    console.log("un_departamento:", departamento);
    console.log("una_localidad:", localidad);

    let layerId = null;
    if (
      (this.capturarLayerId && !this.selectedFeatures[0].attributes.OBJECTID) ||
      this.capturedInformation.length > 0
    ) {
      layerId = String(this.capturedInformation[0].feature.attributes.OBJECTID);
    }
    console.log("un_addressid", layerId);
    // this.insertOrderTag();

    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.GenerarOrdenCorrectivo,
          [
            new InputParameter("una_Actividad_gis", actividadgis),
            new InputParameter("una_Actividad", actividad),
            new InputParameter("tags", tags),
            new InputParameter("un_elemento", elemento),
            new InputParameter("una_observacion", abservacion),
            new InputParameter("un_producto", 0),
            new InputParameter("un_suscriptor", ""),
            new InputParameter("ionuorderid", ""),
            new InputParameter("onuerrorcode", ""),
            new InputParameter("osberrormessage", ""),
            new InputParameter("un_departamento", departamento),
            new InputParameter("una_localidad", localidad),
            new InputParameter("un_guid", guid),
            new InputParameter("un_addressid", layerId),
          ]
        )
      )
      .subscribe(
        (response) => {
          console.log("respuesta del servidor", response);

          if (
            response &&
            response["onuerrorcode"] != null &&
            response["osberrormessage"] != null
          ) {
            const errorCode = response["onuerrorcode"];
            const errorMessage = response["osberrormessage"];

            if (errorCode === 0) {
              const orderId = response["ionuorderid"];
              if (orderId != null) {
                alert(
                  `Orden generada exitosamente. Número de orden: ${orderId}`
                );
                this.closeFunction();
              } else {
                alert("La orden no pudo ser generada correctamente.");
              }
            } else {
              alert(`Error generando la orden: ${errorMessage}`);
            }
          } else {
            alert("Error en la respuesta del servidor");
          }
        },
        (error) => {
          console.error("Error al llamar al procedimiento:", error);
          alert("Error al generar la orden. Por favor, inténtalo de nuevo.");
        }
      );
  }

  private insertOrderTag(): void {
    const guid = uuidv4().toString();
    const actividad = this.selectedActividad.COD_ACTIVIDAD_ODF;
    const elemento = this.selectedValue;
    const subtipo = this.selectedValue.suptipoelemento;
    const tag = this.selectedFeatures[0].attributes.TAG.toString();
    const departamento = this.departamento;
    const localidad = this.selectedFeatures[0].attributes.LOCALIDAD;

    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.LOGInsertarOrdenTag,
          [
            new InputParameter("uudi", guid),
            new InputParameter("un_tag", tag),
            new InputParameter("un_elemento", elemento),
            new InputParameter("un_subtipo", subtipo),
            new InputParameter("un_departamento", departamento),
            new InputParameter("una_localidad", localidad),
            new InputParameter("una_actividadgis", actividad),
          ]
        )
      )
      .subscribe((json) => {
        console.log(" insertaordertag", json);

        if (json[1] != null) {
          // Aquí puedes realizar alguna acción adicional si lo necesitas
        }
      });
  }
  private ValidarElementoSitieneOrden(): void {
    const tag = this.selectedFeatures[0].attributes.TAG.toString();
    const actividadgis = parseFloat(this.selectedActividad.CODIGO);

    this.apiService
      .callStoreProcedureV2(
        RequestHelper.getParamsForStoredProcedureV2(
          StoreProcedures.ValidarElementoSitieneOrden,
          [
            new InputParameter("un_tag", tag),
            new InputParameter("una_actividad_gis", actividadgis),
            new InputParameter("cuantos", 0),
          ]
        )
      )
      .subscribe((json) => {
        console.log("respuesta del tag", json);
      });
  }
}
