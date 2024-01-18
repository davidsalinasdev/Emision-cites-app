// Para el auto completado
import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';

// Index de Usuarios
export const indexUsuario = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    return res.status(200).json({
        usuarios: usuarios
    });
};

// show de Usuarios
export const showUsuario = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        return usuario
            ? res.status(200).json({ usuario })
            : res.status(404).json({ error: `No existe un usuario con el id ${id}` });
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Store de Usuarios
export const storeUsuario = async (req: Request, res: Response) => {


    try {

        const { body } = req;

        // Validación de datos (puedes ajustar esto según tus necesidades)
        if (!body.nombre || !body.email) {
            return res.status(400).json({
                error: 'Nombre y correo electrónico son campos obligatorios.'
            });
        }

        // Validacion de emails duplicados
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            });
        }


        // Crea una nueva instancia de Usuario y asigna los valores del cuerpo
        const usuario = new Usuario(body);

        await usuario.save();

        return res.status(200).json({
            usuario
        });

    } catch (error) {
        console.error("Error al guardar el usuario:", error);
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }

};

// Update de Usuarios
export const updateUsuario = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const { body } = req;

        // Validacion si el usuario existe
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        // Tambien se puede actualizar solo la data que nos interese
        await usuario.update(body);


        return res.status(200).json({
            msg: 'Se actualizo correctamente',
            usuario
        })



    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }
};

// Delete de Usuarios
export const deleteUsuario = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const { body } = req;

        // Validacion si el usuario existe
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        // Eliminación física
        // await usuario.destroy();

        // Eliminación logica  
        await usuario.update({
            estado: false
        })

        return res.status(200).json({
            msg: 'Se elimino correctamente correctamente',
            usuario
        })

    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }


};
