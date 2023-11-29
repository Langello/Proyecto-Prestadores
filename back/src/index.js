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
import { obtenerPrestadores, obtenerPrestadorPorId, obtenerPrestadorByToken, obtenerPromedioCalificacion } from "./controllers/prestador/getsPrestador.js";
import { borrarPrestador } from "./controllers/prestador/borrarPrestador.js";
import { obtenerTiposUsuario } from "./controllers/usuario/obtenerTiposUsuario.js";
import { crearConsumidor } from "./controllers/consumidor/crearConsumidor.js";
import { obtenerConsumidorPorId, obtenerConsumidores, obtenerConsumidorByToken } from "./controllers/consumidor/getsConsumidor.js";
import { putConsumidor } from "./controllers/consumidor/putConsumidor.js";
import { crearTrabajo } from "./controllers/trabajo/crearTrabajo.js";
import { crearServicio } from "./controllers/servicio/crearServicio.js";
import { obtenerTrabajos, obtenerTrabajoPorId, obtenerTrabajosByConsumidor, obtenerTrabajosByPrestador } from "./controllers/trabajo/getsTrabajo.js";
import { loginUsuario, getRoles } from "./controllers/usuario/loginUsuario.js";
import { enviarMensajeAConsumidor, enviarMensajeAPrestador } from "./controllers/mensaje/enviarMensaje.js";
import { getMensajeConsumidorEnviado, getMensajeConsumidorRecibido, getMensajePrestadorRecibido, getMensajePrestadorEnviado } from "./controllers/mensaje/getMensaje.js";
import { borrarMensajeConsumidorEnviado, borrarMensajeConsumidorRecibido, borrarMensajePrestadorEnviado, borrarMensajePrestadorRecibido } from "./controllers/mensaje/borrarMensaje.js";
import { esMiTrabajoConsumidor, esMiTrabajoPrestador } from "./controllers/trabajo/esMiTrabajo.js";
import { patchEstadoTrabajo } from "./controllers/trabajo/patchTrabajoEstado.js";
import { patchTrabajoPrestadorAsignado } from "./controllers/trabajo/patchTrabajoPrestadorAsignado.js";
import { patchTrabajoCalificacion } from "./controllers/trabajo/patchTrabajoCalificacion.js";
import { getDocumentacion } from "./controllers/documentacion.js";

const app = express();
const port = process.env.PORT || 3050;


app.use(cors()); // Configurar CORS
app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

// Conexión a la base de datos
autenticar();

// Rutas
app.get("/", getDocumentacion);
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
// Obtener prestadores
app.get("/prestador", obtenerPrestadores);
// Obtener prestador por ID
app.get("/prestador/:idPrestador", obtenerPrestadorPorId);
// Obtener promedio de calificacion de prestador
app.get("/promedio-calificacion/:idPrestador", obtenerPromedioCalificacion);
// Borrar prestador
app.delete("/prestador/:idPrestador", borrarPrestador);
// Actualizar prestador
app.put("/prestador", validarToken, actualizarPrestador);
// Crear consumidor
app.post("/consumidor", validarToken, validarIdUsuarioRepetidoConsumidor, crearConsumidor);
// Obtener consumidor por ID
app.get("/consumidor/:idConsumidor", obtenerConsumidorPorId);
// Obtener consumidores
app.get("/consumidor", obtenerConsumidores);
// Actualizar consumidor
app.put("/consumidor", validarToken, putConsumidor);
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
app.get("/mensaje-consumidor-enviado/:token", getMensajeConsumidorEnviado);
// Borrar mensaje de consumidor enviado
app.delete("/mensaje-consumidor-enviado/:token", borrarMensajeConsumidorEnviado);
// Obtener mensajes de consumidor recibidos
app.get("/mensaje-consumidor-recibido/:token", getMensajeConsumidorRecibido);
// Borrar mensaje de consumidor recibido
app.delete("/mensaje-consumidor-recibido/:token", borrarMensajeConsumidorRecibido);
// Obtener mensajes de prestador enviados
app.get("/mensaje-prestador-enviado/:token", getMensajePrestadorEnviado);
// Borrar mensaje de prestador enviado
app.delete("/mensaje-prestador-enviado/:token", borrarMensajePrestadorEnviado);
// Obtener mensajes de prestador recibidos
app.get("/mensaje-prestador-recibido/:token", getMensajePrestadorRecibido);
// Borrar mensaje de prestador recibido
app.delete("/mensaje-prestador-recibido/:token", borrarMensajePrestadorRecibido);
// Obtener roles para dar permisos
app.post("/roles", validarToken, getRoles);
// Saber si soy el dueño de ese trabajo como consumidor
app.post("/es-mi-trabajo-consumidor", validarToken, esMiTrabajoConsumidor);
// Saber si soy el dueño de ese trabajo como prestador
app.post("/es-mi-trabajo-prestador", validarToken, esMiTrabajoPrestador);
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






