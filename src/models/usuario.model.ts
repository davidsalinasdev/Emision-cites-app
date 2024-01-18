// Este es un ejemplo de modelo para consumir en los enpoinst
// Hace saneamiento de querys
// Hace inserciones seguras
// Protege de injecciones de SQL


import { DataTypes, Model } from 'sequelize';
import db from '../database/connection';

// Define la clase Usuario que extiende de Model
class Usuario extends Model {
    public nombre?: string;
    public email?: string;
    public estado?: boolean;
}

// Inicializa el modelo con los atributos y opciones
Usuario.init({
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize: db, // pasa la instancia de Sequelize (db)
    modelName: 'Usuario', // el nombre del modelo en singular
});

export default Usuario;
