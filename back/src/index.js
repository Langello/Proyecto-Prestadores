import express from "express";
import cors from "cors";
import { autenticar } from "./db.js";
import { crearUsuario } from "./controllers/usuario/crearUsuario.js";
import { borrarUsuario } from "./controllers/usuario/borrarUsuario.js";
import { actualizarUsuario } from "./controllers/usuario/actualizarUsuario.js";
import { obtenerUsuarios, obtenerUsuarioPorId } from "./controllers/usuario/getsUsuario.js";
import { validarIdUsuarioExiste, validarContrasena, validarEmailRepetido, validarFormatoEmail, validarDniRepetido, validarFechaNacimiento, validarCuilCuitRepetido, validarIdUsuarioRepetidoPrestador, validarIdUsuarioRepetidoConsumidor } from "./controllers/validaciones.js";
import { crearPrestador } from "./controllers/prestador/crearPrestador.js";
import { actualizarPrestador } from "./controllers/prestador/actualizarPrestador.js";
import { obtenerPrestadores, obtenerPrestadorPorId } from "./controllers/prestador/getsPrestador.js";
import { borrarPrestador } from "./controllers/prestador/borrarPrestador.js";
import { obtenerTiposUsuario } from "./controllers/usuario/obtenerTiposUsuario.js";
import { crearConsumidor } from "./controllers/consumidor/crearConsumidor.js";
import { obtenerConsumidorPorId, obtenerConsumidores } from "./controllers/consumidor/getsConsumidor.js";
import { crearTrabajo } from "./controllers/trabajo/crearTrabajo.js";
import { crearServicio } from "./controllers/servicio/crearServicio.js";
import { obtenerTrabajos, obtenerTrabajoPorId } from "./controllers/trabajo/getsTrabajo.js";


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
app.put("/usuario/:id", validarContrasena, validarFechaNacimiento, validarDniRepetido, actualizarUsuario);
// Listar usuarios
app.get("/usuario", obtenerUsuarios);
// Obtener usuario por ID
app.get("/usuario/:id", obtenerUsuarioPorId);
// Obtener tipos de usuario
app.get("/tipos-usuario", obtenerTiposUsuario);
// Crear prestador
app.post("/prestador/:idUsuario", validarIdUsuarioExiste, validarIdUsuarioRepetidoPrestador, validarCuilCuitRepetido, crearPrestador);
// Actualizar prestador
app.put("/prestador/:idPrestador", validarCuilCuitRepetido, actualizarPrestador);
// Obtener prestadores
app.get("/prestador", obtenerPrestadores);
// Obtener prestador por ID
app.get("/prestador/:idPrestador", obtenerPrestadorPorId);
// Borrar prestador
app.delete("/prestador/:idPrestador", borrarPrestador);
// Crear consumidor
app.post("/consumidor/:idUsuario", validarIdUsuarioExiste, validarIdUsuarioRepetidoConsumidor, crearConsumidor);
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




app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})






