export enum StoreProcedures {
  ObtenerParametrosGis = "opcionesgis.obtenerparametrosgis",
  ObtenerMapasBasePorApp = "opcionesgis.obtenerparametrosmapabasebyapp",
  InsertarAdjunto = "ADJUNTOS.INSERTARADJUNTO",
  ObtenerIdentificacionPredio = "consultas.identificarpredio",
  ObtenerAdjuntos = "ADJUNTOS.OBTENERADJUNTOS",
  EliminarAdjuntos = "ADJUNTOS.ELIMNARADJUNTO",
  ObtenerArchivoAdjunto = "ADJUNTOS.OBTENERARCHIVOADJUNTO",
  ObtenerContratistas = "manejoestaciones.obtienecontratista",
  ObtenerInterventor = "manejoestaciones.obtieneinterventor",
  ObtenerTecnico = "manejoestaciones.obtienetecnico",
  ObtenerPruebaRadiologica = "manejoestaciones.ObtenerPruebaRadiologica",
  ManejoPruebaRadiologica = "manejoestaciones.ManejoPruebaRadiologica",
  Obtienefabricante = "manejoestaciones.obtienefabricante",
  Obtienetuberias = "manejoestaciones.obtienetuberias",
  Obtienecalidad = "manejoestaciones.obtienecalidad",
  Obtienemedioprueba = "manejoestaciones.obtienemedioprueba",
  Obtienecontratante = "manejoestaciones.obtienecontratante",
  Obtieneinterventor = "manejoestaciones.obtieneinterventor",
  Obtienesoldador = "manejoestaciones.obtienesoldador",
  ObtenerPruebaNeumatica = "manejoestaciones.ObtenerPruebaNeumatica",
  ManejoPruebaNeumatica = "manejoestaciones.ManejoPruebaNeumatica",
  ObtieneComponentes = "manejoestaciones.ObtieneComponentes",
  ObtenerComponentes = "manejoestaciones.ObtenerComponentes",
  ManejoComponentes = "manejoestaciones.ManejoComponentes",
  ObtenerDepartamentos = "Busquedas.ObtenerDepartamentos",
  ObtenerLocalidades = "Busquedas.ObtenerLocalidades",
  ObtenerModificaciones = "manejoestaciones.ObtenerModificaciones",
  ManejoModificaciones = "manejoestaciones.ManejoModificaciones",
  TipoRiesgo = "RIESGOS.TipoRiesgo",
  ZonaRiesgo = "RIESGOS.ZonaRiesgo",
  ActualizarRiesgos = "RIESGOS.ActualizaRiesgos",
  ObtenerTiposVia = "Busquedas.ObtenerTiposDeVia",
  ObtenerTiposLugar = "Busquedas.ObtenerTiposDeLugar",
  ConsumoPolivalvulaLocalidad = "REDES.ConsumoPolivalvulaLocalidad",
  ArmarDireccion = "ARMADIRECCION",
  BusquedaDireccion = "ICT_APLICACIONES.BUSQUEDA_DIRECCION",
  ReporteCrucesEspaciales = "REPORTES.ReporteCrucesEspeciales",
  ObtenerPlantillasPloteo = "opcionesgis.obtenerplantillasploteo",
  ObtenerParametrosPlantilla = "opcionesgis.obtenerparametrosplantilla",
  ObtenerProyectos = "MANEJOPROYECTOS.ObtenerProyectos",
  ObtenerListas = "MANEJOPROYECTOS.ObtenerListas",
  MetrosLineales = "MANEJOPROYECTOS.MetrosLineales",
  ParametrosPresupuesto = "MANEJOPROYECTOS.ParametrosPresupuesto",
  ParametrosPresupuestoUc = "MANEJOPROYECTOS.ParametrosPresupuestoUc",
  Presupuesto = "MANEJOPROYECTOS.Presupuesto",
  ConsultaPorOT = "MANEJOPROYECTOS.ConsultaPorOT",
  ConsultaPorAtencion = "MANEJOPROYECTOS.ConsultaPorAtencion",
  ConsultaPorEstado = "MANEJOPROYECTOS.ConsultaPorEstado",
  ConsultaMateriales = "MANEJOPROYECTOS.ConsultaMateriales",
  ListaTiposRecepcion = "ICT_ESTRATOS.ListarReceptionTypes",
  VerificarEstratos = "ICT_ESTRATOS.VERIFICARESTRATOS",
  ActualizarEstratos = "ICT_ESTRATOS.ACTUALIZARESTRATOS",
  ObtenerBusquedas = "Busquedas.ObtenerBusquedas",
  ObtenerParametrosBusquedas = "Busquedas.ObtenerParametros",
  ObtenerTematicos = "tematicos.obtenertematicos",
  ObtenerParametrosTematicos = "tematicos.obtenerparametros",
  ObtenerConsulta = "Consultas.ObtenerConsultas",
  ObtenerParametro = "Consultas.ObtenerParametros",
  ObtenerPrensas = "REDES.ObtenerPrensas",
  ObtenerUsuariosAfectados = "REDES.UsuariosAfectados",
  ObtenerRecalcularUsuariosAfectados = "REDES.RecalcularUsuariosAfectados",
  ObtenerListado = "REDES.ObtenerListadoEmergencias",
  ObtenerResultado = "REDES.ObtieneResultadosEmergencias",
  ObtenerOperarios = "REDES.ObtenerOperarios",
  ObtenerTuberiasPrensado = "REDES.ObtenerTuberiasPrensado",
  spTraceAll = "PKEMERGENCY.spTraceAll",
  Trace = "REDES.Trace",
  CrearPrensa = "REDES.CrearPrensa",
  EliminarPrensa = "REDES.EliminarPrensa",
  ValidarElementoSitieneOrden = "MANTENIMIENTO.ValidarElementoSitieneOrden",
  LOGInsertarOrdenTag = "MANTENIMIENTO.LOGInsertarOrdenTags",
  seleccionarIDaddres = "MANTENIMIENTO.SeleccionarIDaddres",
  InsertaKF = "MANTENIMIENTO.InsertaKF",
  ObtenerElementosParaAgregar = "MANTENIMIENTO.ObtenerElementosParaAgregar",
  GenerarOrdenCorrectivoLocal = "MANTENIMIENTO.GenerarOrdenCorrectivoLocal",
  GenerarCorrectivo = "MANTENIMIENTO.GenerarCorrectivo",
  ObtenerActividadPorTipo = "MANTENIMIENTO.ObtenerActividadPorTipo",
  ObtenerInfoOrdenConsult = "MANTENIMIENTO.ObtenerInfoOrdenConsult",
  HistocambiosOrden = "MANTENIMIENTO.HistocambiosOrden",
  GenerarOrdenCorrectivo = "MANTENIMIENTO.GenerarOrdenCorrectivo",
  OrdenesAsignadasPorLocalidad = "MANTENIMIENTO.OrdenesAsignadasPorLocalidad",
  AgregarElementosOrden = "MANTENIMIENTO.AgregarElementosOrden",
  ObtenerTiposdeActividad = "MANTENIMIENTO.ObtenerTiposdeActividad",
  ObtenerCorrectivosPorTipo = "MANTENIMIENTO.ObtenerCorrectivosPorTipo",
  ObtenerActividadPpalPorTrabajo = "MANTENIMIENTO.ObtenerActividadPpalPorTrabajo",
  ObtenerActividades = "MANTENIMIENTO.ObtenerActividades",
  ObtenerElementosActividad = "MANTENIMIENTO.ObtenerElementosActividad",
  ObtenerElementosFiltro = "MANTENIMIENTO.ObtenerElementosFiltro",
  ReporteCronogramaMantenimiento = "MANTENIMIENTO.ReporteCronogramaMantenimiento",
  IndiceCalidad = "MANTENIMIENTO.IndiceCalidad",

  ReporteDeInterrupciones = "REDES.ReporteDeInterrupciones",
  ObtenerTipoFallas = "REDES.ObtieneTipoFalla",
  ObtenerTiposCausas = "REDES.ObtenerTipoCausa",
  ReestablecerServicio = "REDES.ReestablecerServicio",
  LimpiaValvula = "REDES.LimpiaValvula",
  InsertaValvula = "REDES.InsertaValvula",
  OrigenSuspension = "REDES.OrigenDeLasuspension",
  MediosComunicacion = "REDES.MedioComunicacion",
  FueraServicio = "REDES.FueraDeServicio",
  InsertaPrensa = "REDES.InsertaPrensa",
  InsertarUsuarioAfectado = "REDES.InsertarUsuarioAfectado",
  EliminarUsuarioAfectado = "REDES.EliminarUsuarioAfectado",
  ObtenerDatasets = "Administracion.ObtenerDatasets",
  ObtenerElementosDataSets = "Administracion.ObtenerElementosDataSets",
  ObtenerCamposElementos = "Administracion.ObtenerCamposElementos",
  InsertarCampoElemento = "Administracion.InsertarCampoElemento",
  ActualizarCampoElemento = "Administracion.ActualizarCampoElemento",
  EliminarCampoElemento = "Administracion.EliminarCampoElemento",
  ObtenerOpcionesApagadasPerfil = "opcionesgis.obteneropcionesapagadasperfil",
  ObtenerOpcionesApagadasLDC = "opcionesgis.obteneropcionesapagadasldc",
  ObtenerTablasGraficas = "GDB.ObtenerTablasGraficas",
  ObtenerComboRelaciones = "administracion.obtenercomborelaciones",
  CambiarContrasenia = "opcionesgis.cambiarcontrasena",
  ObtenerComboMetodos = "administracion.obtenercombometodos",
  ObtenerComboCampos = "administracion.obtenercombocampos",
  ObtenerTipoElemento = "administracion.obtenertipoelemento",
  ObtenerCamposfcsg = "GDB.obtenercamposfcsg",
  ObtenerCamposComunesfcsg = "gdb.obtenercamposcomunesfcsg",
  ObtenerCamposHistoria = "administracion.obtenercamposhistoria",
  DesbloquearUsuario = "opcionesgis.desbloquearUsuario",
  AsignarPermisosUsuario = "opcionesgis.AsignarPermisosUsuario",
  // Información de Proyecto.
  RegistrodeProyectos = "MANEJOPROYECTOS.RegistrodeProyectos",
  // Orden Padre.
  RegistraOrdenPadre = "PATRULLAJE.RegistraOrdenPadre",
  // Asignar Contratista.
  Departamento = "PATRULLAJE.ObtenerDepartamentos",
  ObtenerUnidades = "PATRULLAJE.ObtenerUnidades",
  ContratistaxUniOperativa = "PATRULLAJE.ContratistaxUniOperativa",
  OrdenesPadreSinContratista = "PATRULLAJE.OrdenesPadreSinContratista",
  AsociarContratistaOrdenPadre = "PATRULLAJE.AsociarContratistaOrdenPadre",
  // Patrullaje.
  PruebaListarPatrullaje = "PATRULLAJE.ListarPatrulleros",
  ListarContratista = "PATRULLAJE.ListarContratista",
  CrearPatrullero = "PATRULLAJE.CrearPatrullero",
  ActualizarPatrullero = "PATRULLAJE.ActualizarPatrullero",
  // Lista Correos.
  ListaAlertaPersona = "PATRULLAJE.ListarAlertaPersona",
  PersonasSinAlertas = "PATRULLAJE.PersonasSinAlertas",
  AdicionarAlerta = "PATRULLAJE.AdicionarAlerta",
  BorrarAlertaPersona = "PATRULLAJE.BorrarAlertaPersona",
  // Riesgo de Seguridad.
  ListarManzanas = "PATRULLAJE.ListarManzanasTag",
  ManzanaRiesgo = "PATRULLAJE.PuedeManzanaRiesgo",
  AdicionarManzna = "PATRULLAJE.CrearManzanas",
  ManzanaRiesgoSeguridad = "PATRULLAJE.ManzanaRiesgo",
  EliminarManzana = "PATRULLAJE.BorrarManzanas",
  // Tablas Tipo.
  ListarTablasT = "PATRULLAJE.ListarTablasT",
  ListarTablasTipos = "PATRULLAJE.ListarTablasTipos",
  CrearTablasTipos = "PATRULLAJE.CrearTablasTipos",
  // Equipo.
  ListarEquipo = "PATRULLAJE.ListarEquipo",
  AdicionarEquipo = "PATRULLAJE.CrearEquipo",
  ModificarEquipo = "PATRULLAJE.ActualizarEquipo",
  // Gestión de Ordenes.
  ObtenerOrdenPadre = "PATRULLAJE.ObtenerOrdenesPadre",
  PuedeLegalizar = "PATRULLAJE.PuedeLegalizar",
  TieneOrdenesHija = "PATRULLAJE.TieneSectorManzana",
  ListarOrdenHIja = "PATRULLAJE.ObtenerOrdenesHija",
  CrearOrdenHIja = "PATRULLAJE.CrearOrdenHija",
  PuedeManzana = "PATRULLAJE.PuedeManzana",
  UpdatePatrulleroOrden = "PATRULLAJE.UpdatePatrulleroOrden",
  validacionManzana = "PATRULLAJE.validacionManzana",
  desasignarmanzanas = "PATRULLAJE.desasignarmanzanas",
  UpdateEquipoOrden = "PATRULLAJE.UpdateEquipoOrden",
  DesasignarEquipoOrden = "PATRULLAJE.DesasignarEquipoOrden",
  ListarPatrullerosUnidad = "PATRULLAJE.ListarPatrullerosUnidad",
  ListarEquipos = "PATRULLAJE.ListarEquipos",
  TieneManzanasPatrulleroUnd = "PATRULLAJE.TieneManzanasPatrulleroUnd",
  // Contratista.
  OrdenesPadrePorContratista = "PATRULLAJE.OrdenesPadrePorContratista",
  DatosContratista = "PATRULLAJE.DatosContratista",
  AvanceContratista = "PATRULLAJE.AvanceContratista",
  DatosOrdenPadre = "PATRULLAJE.DatosOrdenPadre",
  ManzanaPorOrdenPadre = "PATRULLAJE.ManzanaPorOrdenPadrePuntos",
  // Consulta Patrulleros.
  ListarPatrulleroPorContratista = "PATRULLAJE.ListarPatrulleroPorContratista",
  ListarOrdenPadreXPatrullero = "PATRULLAJE.ListarOrdenPadreXPatrullero",
  ListarOrdenHijaXPatrullero = "PATRULLAJE.ListarOrdenHijaXPatrullero",
  ListarDatosPatrullero = "PATRULLAJE.ListarDatosPatrullero",
  AvcTotalPatruXOrdPadre = "PATRULLAJE.AvcTotalPatruXOrdPadre",
  DatosOrdenHija = "PATRULLAJE.DatosOrdenHija",
  histpatrullero = "PATRULLAJE.histpatrulleroPuntos",
  PatrulleroManzana = "PATRULLAJE.TieneManzanasPatrulleroUnd2",
  PintarHistorico = "PATRULLAJE.GeometriaHistorico",
  // Ordenes Consulta.
  OrdenesHijaOrdenPadre = "PATRULLAJE.OrdenesHijaOrdenPadre",
  OrdenCorrectivaXOrdenHija = "PATRULLAJE.OrdenCorrectivaXOrdenHija",
  DatosOrdenCorrectiva = "PATRULLAJE.DatosOrdenCorrectiva",
  ManzanasPorOrdenHija = "PATRULLAJE.ManzanasPorOrdenHija",
  // Reportes y Estadísticas.
  ListarOrdesPadrexContra = "PATRULLAJE.ListarOrdesPadrexContra",
  ListarPatruXOrdenPadre = "PATRULLAJE.ListarPatruXOrdenPadre",
  ReporteOrdPadrePorContratista = "PATRULLAJE.ReporteOrdPadrePorContratista",
  ReporteOrdHijaPorContratista = "PATRULLAJE.ReporteOrdHijaPorContratista",
  ResumenContratista = "PATRULLAJE.ResumenContratista",
  ReporteOrdPadrePorCOrdPadre = "PATRULLAJE.ReporteOrdPadrePorCOrdPadre",
  ReporteOrdHijaPorPadre = "PATRULLAJE.ReporteOrdHijaPorPadre",
  ResumenPorOrdPadre = "PATRULLAJE.ResumenPorOrdPadre",
  ReportePatrullero = "PATRULLAJE.ReportePatrullero",
  ReporteOrdHijaPatrullero = "PATRULLAJE.ReporteOrdHijaPatrullero",
  ResumenPatrullero = "PATRULLAJE.ResumenPatrullero",
  // Dashboard.
  ListarDepartamentosDashboard = "PATRULLAJE.ListarDepartamentosDashboard",
  ListarContratistasDashboard = "PATRULLAJE.ListarContratistasDashboard",
  SumaDashboardDepartamento = "PATRULLAJE.SumaDashboardDepartamento",
  SumaDashboardContratista = "PATRULLAJE.SumaDashboardContratista",
  PruebaDepartamentoSemana = "PATRULLAJE.PruebaDepartamentoSemana",
  PruebaDashboard = "PATRULLAJE.PruebaDashboard",
  // Legalizar Ordenes.
  ObtenerPerfilUsuario = "MANTENIMIENTO.ObtenerPerfilUsuario",
  ResetObtenerInterventor = "MANTENIMIENTO.ObtenerInterventor",
  ObtenerOrdenesMantenimiento = "MANTENIMIENTO.ObtenerOrdenesMantenimiento",
  OrdenesMantenimientoConsulta = "MANTENIMIENTO.OrdenesMantenimientoConsulta",
  ObtenerInfoOrden = "MANTENIMIENTO.ObtenerInfoOrden",
  ActualizaPlano = "MANTENIMIENTO.ActualizaPlano",
  ObtenerItemsCorrectivo = "MANTENIMIENTO.ObtenerItemsCorrectivo",
  ObtenerSumaItemsCorrectivo = "MANTENIMIENTO.ObtenerSumaItemsCorrectivo",
  ObtenerTagsCorrectivo = "MANTENIMIENTO.ObtenerTagsCorrectivo",
  ObtenerTagsCorrectivos = "MANTENIMIENTO.ObtenerTagsCorrectivos",
  ObtenerTagsCorrectivosConsult = "MANTENIMIENTO.ObtenerTagsCorrectivosConsult",
  ActualizarTecnicoContratista = "MANTENIMIENTO.ActualizarTecnicoContratista",
  ObtenerItemsPreventivo = "MANTENIMIENTO.ObtenerItemsPreventivo",
  obtenerparametros = "mantenimiento.obtenerparametros",
  ObtenerPersonas = "MANTENIMIENTO.ObtenerPersonas",
  ObtenerCausalesLegal = "MANTENIMIENTO.ObtenerCausalesLegal",
  RegisterCommentarioOrden = "MANTENIMIENTO.RegisterCommentarioOrden",
  ObtenerDatosAdicionales = "MANTENIMIENTO.ObtenerDatosAdicionales",
  ObtenerCausalesLegalxOrden = "MANTENIMIENTO.ObtenerCausalesLegalxOrden",
  TipoComentarioLegalizar = "MANTENIMIENTO.TipoComentarioLegalizar",
  EjecutarOrden = "MANTENIMIENTO.EjecutarOrden",
  AdicionarComentarios = "ManejoOrdenes.AdicionarComentarios",
  ObtenerDatosAdicionalesTemp = "MANTENIMIENTO.ObtenerDatosAdicionalesTemp",
  CambiarEstadoOrden = "MANTENIMIENTO.CambiarEstadoOrden",
  ObtenerCorreoInterventor = "MANTENIMIENTO.ObtenerCorreoInterventor",
  ObtenerCorreoContratista = "MANTENIMIENTO.ObtenerCorreoContratista",
  ObtenerCorreoLegalizador = "MANTENIMIENTO.ObtenerCorreoLegalizador",
  GuardarComentarioLegal = "MANTENIMIENTO.GuardarComentarioLegal",
}
