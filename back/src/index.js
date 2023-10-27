import { autenticar } from "./db.js";
import  express  from "express";
import { crearUsuario } from "./usuario/crearUsuario.js";
import { borrarUsuario } from "./usuario/borrarUsuario.js";
import { obtenerUsuarios , obtenerUsuarioPorId } from "./usuario/getsUsuario.js";
import { actualizarUsuario } from "./usuario/actualizarUsuario.js";


const app = express();
const port = 3050;

app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

autenticar();

// Rutas para el administrador
// Crear usuario
app.post("/nuevo-usuario", crearUsuario);
// Borrar usuario
app.delete("/borrar-usuario/:id", borrarUsuario);
// Actualizar usuario
app.put("/actualizar-usuario/:id", actualizarUsuario);
// Listar usuarios
app.get("/listar-usuarios", obtenerUsuarios);
// Obtener usuario por ID
app.get("/obtener-usuario/:id", obtenerUsuarioPorId);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})






