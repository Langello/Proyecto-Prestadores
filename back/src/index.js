import express from "express";
import cors from "cors";
import { autenticar } from "./db.js";
import { crearUsuario } from "./controllers/usuario/crearUsuario.js";
import { borrarUsuario } from "./controllers/usuario/borrarUsuario.js";
import { actualizarUsuario } from "./controllers/usuario/actualizarUsuario.js";
import { obtenerUsuarios, obtenerUsuarioPorId } from "./controllers/usuario/getsUsuario.js";
import { validarToken, validarDisponibilidad, validarIdUsuarioExiste, validarContrasena, validarEmailRepetido, validarFormatoEmail, validarDniRepetido, validarFechaNacimiento, validarCuilCuitRepetido, validarIdUsuarioRepetidoPrestador, validarIdUsuarioRepetidoConsumidor } from "./controllers/validaciones.js";
import { crearPrestador } from "./controllers/prestador/crearPrestador.js";
import { actualizarPrestador } from "./controllers/prestador/actualizarPrestador.js";
import { obtenerPrestadores, obtenerPrestadorPorId, obtenerPrestadorByToken } from "./controllers/prestador/getsPrestador.js";
import { borrarPrestador } from "./controllers/prestador/borrarPrestador.js";
import { obtenerTiposUsuario } from "./controllers/usuario/obtenerTiposUsuario.js";
import { crearConsumidor } from "./controllers/consumidor/crearConsumidor.js";
import { obtenerConsumidorPorId, obtenerConsumidores, obtenerConsumidorByToken } from "./controllers/consumidor/getsConsumidor.js";
import { crearTrabajo } from "./controllers/trabajo/crearTrabajo.js";
import { crearServicio } from "./controllers/servicio/crearServicio.js";
import { obtenerTrabajos, obtenerTrabajoPorId , obtenerTrabajosByConsumidor, obtenerTrabajosByPrestador} from "./controllers/trabajo/getsTrabajo.js";
import { loginUsuario, getRoles } from "./controllers/usuario/loginUsuario.js";
import { enviarMensajeAConsumidor, enviarMensajeAPrestador } from "./controllers/mensaje/enviarMensaje.js";
import { getMensajeConsumidorEnviado, getMensajeConsumidorRecibido, getMensajePrestadorRecibido, getMensajePrestadorEnviado } from "./controllers/mensaje/getMensaje.js";
import { esMiTrabajoConsumidor, esMiTrabajoPrestador } from "./controllers/trabajo/esMiTrabajo.js";
import { patchEstadoTrabajo } from "./controllers/trabajo/patchTrabajoEstado.js";
import { patchTrabajoPrestadorAsignado } from "./controllers/trabajo/patchTrabajoPrestadorAsignado.js";
import { patchTrabajoCalificacion } from "./controllers/trabajo/patchTrabajoCalificacion.js";

const app = express();
const port = process.env.PORT || 3050;


app.use(cors()); // Configurar CORS
app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

// Conexión a la base de datos
autenticar();

// Rutas 
// Crear usuario
app.post("/usuario", validarEmailRepetido, validarFormatoEmail, validarDniRepetido, validarContrasena, validarFechaNacimiento, crearUsuario);
// Borrar usuario
app.delete("/usuario/:id", borrarUsuario);
// Actualizar usuario
app.put("/usuario", validarContrasena, validarFechaNacimiento, validarToken, validarIdUsuarioExiste, actualizarUsuario);
// Listar usuarios
app.get("/usuario", obtenerUsuarios);
// Obtener usuario por ID
app.get("/usuario/:token", obtenerUsuarioPorId);
// Obtener tipos de usuario
app.get("/tipos-usuario", obtenerTiposUsuario);
// Crear prestador
app.post("/prestador", validarToken, validarIdUsuarioRepetidoPrestador, validarCuilCuitRepetido, validarDisponibilidad, crearPrestador);
// Actualizar prestador
app.put("/prestador/:idPrestador", validarCuilCuitRepetido, actualizarPrestador);
// Obtener prestadores
app.get("/prestador", obtenerPrestadores);
// Obtener prestador por ID
app.get("/prestador/:idPrestador", obtenerPrestadorPorId);
// Borrar prestador
app.delete("/prestador/:idPrestador", borrarPrestador);
// Crear consumidor
app.post("/consumidor", validarToken, validarIdUsuarioRepetidoConsumidor, crearConsumidor);
// Obtener consumidor por ID
app.get("/consumidor/:idConsumidor", obtenerConsumidorPorId);
// Obtener consumidores
app.get("/consumidor", obtenerConsumidores);
// Crear trabajo
app.post("/trabajo", crearTrabajo);
// Crear servicio
app.post("/servicio", crearServicio);
// Obtener trabajos
app.get("/trabajo", obtenerTrabajos);
// Obtener trabajo por ID
app.get("/trabajo/:idTrabajo", obtenerTrabajoPorId);
// Obtener trabajos por consumidor
app.get("/trabajo-consumidor/:token", obtenerTrabajosByConsumidor);
// Obtener trabajos por prestador
app.get("/trabajo-prestador/:token", obtenerTrabajosByPrestador);
// Login usuario
app.post("/login", validarFormatoEmail, loginUsuario);
// Mensaje de consumidor a prestador
app.post("/mensaje-a-prestador", validarToken, enviarMensajeAPrestador);
// Mensaje de prestador a consumidor
app.post("/mensaje-a-consumidor", validarToken, enviarMensajeAConsumidor);
// Obtener mensajes de consumidor enviados
app.get("/mensaje-consumidor-enviado/:token",  getMensajeConsumidorEnviado);
// Obtener mensajes de consumidor recibidos
app.get("/mensaje-consumidor-recibido/:token", getMensajeConsumidorRecibido);
// Obtener mensajes de prestador enviados
app.get("/mensaje-prestador-enviado/:token", getMensajePrestadorEnviado);
// Obtener mensajes de prestador recibidos
app.get("/mensaje-prestador-recibido/:token", getMensajePrestadorRecibido);
// Obtener roles para dar permisos
app.post("/roles", validarToken, getRoles);
// Saber si soy el dueño de ese trabajo como consumidor
app.post("/es-mi-trabajo-consumidor",  validarToken ,esMiTrabajoConsumidor);
// Saber si soy el dueño de ese trabajo como prestador
app.post("/es-mi-trabajo-prestador",  validarToken ,esMiTrabajoPrestador);
// Cambiar estado de trabajo
app.patch("/trabajo-estado/:idTrabajo", validarToken, patchEstadoTrabajo);
// Asignar prestador a trabajo
app.patch("/trabajo-prestador-asignado/:idTrabajo", validarToken, patchTrabajoPrestadorAsignado);
// Obtener id de prestador por token
app.get("/prestador-id/:token", obtenerPrestadorByToken);
// Obtener id de consumidor por token
app.get("/consumidor-id/:token", obtenerConsumidorByToken);
// Calificar un trabajo
app.patch("/trabajo-calificacion/:idTrabajo", patchTrabajoCalificacion);



app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})






