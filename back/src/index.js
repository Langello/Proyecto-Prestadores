import express from "express";
import { autenticar } from "./db.js";
import { crearUsuario } from "./controllers/crearUsuario.js";
import { borrarUsuario } from "./controllers/borrarUsuario.js";
import { actualizarUsuario } from "./controllers/actualizarUsuario.js";
import { obtenerUsuarios, obtenerUsuarioPorId } from "./controllers/getsUsuario.js";
import { validarContrasena, validarEmailRepetido, validarFormatoEmail, validarDniRepetido, validarFechaNacimiento, validarCuilCuitRepetido ,validarIdUsuarioRepetidoPrestador,validarIdUsuarioRepetidoConsumidor} from "./controllers/validaciones.js";
import { crearPrestador } from "./controllers/crearPrestador.js";
import { actualizarPrestador } from "./controllers/actualizarPrestador.js";
import { obtenerPrestadores, obtenerPrestadorPorId } from "./controllers/getsPrestador.js";
import { borrarPrestador } from "./controllers/borrarPrestador.js";
import { obtenerTiposUsuario } from "./controllers/obtenerTiposUsuario.js";
import { crearConsumidor } from "./controllers/crearConsumidor.js";
import { obtenerConsumidorPorId, obtenerConsumidores } from "./controllers/getsConsumidor.js";
const app = express();
const port = process.env.PORT || 3050;

app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

// Conexión a la base de datos
autenticar();

// Rutas para administrar usuarios
// Crear usuario
app.post("/nuevo-usuario", validarEmailRepetido, validarFormatoEmail, validarDniRepetido, validarContrasena, validarFechaNacimiento, crearUsuario);
// Borrar usuario
app.delete("/borrar-usuario/:id", borrarUsuario);
// Actualizar usuario
app.put("/actualizar-usuario/:id", validarContrasena, validarFechaNacimiento, validarDniRepetido, actualizarUsuario);
// Listar usuarios
app.get("/listar-usuarios", obtenerUsuarios);
// Obtener usuario por ID
app.get("/obtener-usuario/:id", obtenerUsuarioPorId);
// Obtener tipos de usuario
app.get("/obtener-tipos-usuario", obtenerTiposUsuario);
// Crear prestador
app.post("/nuevo-prestador/:idUsuario", validarIdUsuarioRepetidoPrestador,validarCuilCuitRepetido, crearPrestador);
// Actualizar prestador
app.put("/actualizar-prestador/:idPrestador", validarCuilCuitRepetido, actualizarPrestador);
// Obtener prestadores
app.get("/listar-prestadores", obtenerPrestadores);
// Obtener prestador por ID
app.get("/obtener-prestador/:idPrestador", obtenerPrestadorPorId);
// Borrar prestador
app.delete("/borrar-prestador/:idPrestador", borrarPrestador);
// Crear consumidor
app.post("/nuevo-consumidor/:idUsuario", validarIdUsuarioRepetidoConsumidor, crearConsumidor);
// Obtener consumidor por ID
app.get("/obtener-consumidor/:idConsumidor", obtenerConsumidorPorId);
// Obtener consumidores
app.get("/listar-consumidores", obtenerConsumidores);




app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})






