import express, { Application } from 'express';

import cors from "cors";

// Coneccion a la base de datos
import db from '../database/connection';

// Creamos el alias(userRoutes) la ruta de Usuarios
import userRoutes from '../routes/usuarios.routes';


import morgan from 'morgan'; // Procesa los datos antes de que llegue a las rutas

class Server {

    // Propidades de la clase
    private app: Application;
    private port: string;

    // Creando paths de las rutas
    private apiPaths = {
        usuarios: '/api/usuarios' // localhost:8000/api/usuarios( / = este es el que esta en el router)
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Tiene que ejecutarse en ese orden
        // 1.- Base de datos
        this.dbConnection();

        // 2.- This middlerares
        this.middlewares();

        // 3.- Definir mis rutas
        this.routes();
    }

    // 1.- Base de datos
    async dbConnection() {

        try {

            await db.authenticate(); // Si pasa esto la bd esta online
            console.log('Database online');

        } catch (error) {

            throw new Error(`No se puede conectar a la base de datos: ${error}`);

        }


    }


    // 2.- Para parsear el BODY
    // Son metodos que se ejecutan antes de que se pase a una ruta
    public middlewares() {
        //1.- CORS
        this.app.use(cors());

        // 2.-Lectura del BODY para que funcione potsman y entienda los formatos JSON
        this.app.use(express.json());

        // 3.- Configurando la carpeta publica para que pueda servir un sitio estatico
        this.app.use(express.static('src/public'));

    }

    /**
     * PUBLIC ROUTES ES UN middlewares
     */
    public routes() {

        // Morgan
        this.app.use(morgan('dev'));

        // Rutas para USUARIOS
        this.app.use(this.apiPaths.usuarios, userRoutes);

    }

    /**
     * listen Para levantar el servidor
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el Puerto: ' + this.port);
        });
    }

}

// Esta va a ser la clase que se va a exportar por defecto
export default Server;


