import express from "express";
import { autenticar } from "./db.js";
import { crearUsuario } from "./controllers/crearUsuario.js";
import { borrarUsuario } from "./controllers/borrarUsuario.js";
import { actualizarUsuario } from "./controllers/actualizarUsuario.js";
import { obtenerUsuarios, obtenerUsuarioPorId } from "./controllers/getsUsuario.js";
import { validarContrasena, validarEmailRepetido, validarFormatoEmail, validarDniRepetido, validarFechaNacimiento } from "./controllers/validaciones.js";

const app = express();
const port = process.env.PORT || 3050;

app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

autenticar();

// Rutas para el administrador
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

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})






