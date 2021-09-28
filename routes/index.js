const grupoAlimentosRoute = require('./grupoAlimentos.routes');
const alimentosRoute = require('./alimentos.routes');
const subGrupoAlimentosRoute = require('./subGrupoAlimentos.routes');
const recetasRoute = require('./recetas.routes');
const usuariosRoute = require('./usuarios.routes');
const menusBaseRoute = require('./menusBase.routes');
const logrosRoute = require('./logros.routes');
const logrosDeUsuarioRoute = require('./logrosDeUsuario.routes');
const puntosDeUsuarioRoute = require('./puntosDeUsuario.routes');
const equivalenciasRoute = require('./Import/equivalences.routes');
const informacionUsuariosRoute = require('./InformacionUsuarios.routes');
const datosUsuarioRoute = require('./datosUsuarios.routes');
const historialClinicoRoute = require('./historialClinico.routes');
const datosSocioeconomicosRoute = require('./datosSocioeconomicos.routes');
const alimentacionUsuariosRoute = require('./alimentacionUsuarios.routes');
const estadisticasIMCRoute = require('./Estadisticas/estadisticas.IMC.routes');
const estadisticasNivelesRoute = require('./Estadisticas/estadisticas.niveles.routes');
const estadisticasPresionRoute = require('./Estadisticas/estadisticasPresion.routes');
const registroDieteticoRoute = require('./RegistroDietetico/registroDietetico.routes');
const importarAlimentosRoute = require('../routes/Import/alimentos.routes');
const recomendacionesPoblacionalesRoute = require('../routes/Recomendaciones/recomendacionesPoblacionales.routes');

module.exports = {
    grupoAlimentosRoute,
    alimentosRoute,
    subGrupoAlimentosRoute,
    recetasRoute,
    usuariosRoute,
    menusBaseRoute,
    logrosRoute,
    logrosDeUsuarioRoute,
    puntosDeUsuarioRoute,
    equivalenciasRoute,
    informacionUsuariosRoute,
    datosUsuarioRoute,
    historialClinicoRoute,
    datosSocioeconomicosRoute,
    alimentacionUsuariosRoute,
    estadisticasIMCRoute,
    estadisticasNivelesRoute,
    estadisticasPresionRoute,
    registroDieteticoRoute,
    importarAlimentosRoute,
    recomendacionesPoblacionalesRoute,
};
