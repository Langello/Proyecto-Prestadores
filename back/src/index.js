import { autenticar } from "./db.js";
import  express  from "express";
import { crearUsuario } from "./usuario/crearUsuario.js";


const app = express();
const port = 3050;

app.use(express.json()); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido JSON
app.use(express.urlencoded({ extended: false })); // Configuramos el middleware para analizar el cuerpo de las solicitudes con contenido codificado en URL

autenticar();

// Rutas
//Crear usuario
app.post("/nuevo-usuario", crearUsuario);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})






