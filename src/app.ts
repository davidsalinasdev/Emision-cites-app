
// Este es el archivo principal

import dotenv from 'dotenv';
import Server from './models/server';


// Usa la configuracion por defecto para utilizar el archivo .env y luego establece todas las variables de entorno
dotenv.config();

// Creamos un objeto server
const server = new Server();

server.listen();

// Falta configurar morgan y TSC WATCH
