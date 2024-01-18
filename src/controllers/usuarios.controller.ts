// Para el auto completado
import { Request, Response } from 'express';


// Index de Usuarios
export const indexUsuario = async (req: Request, res: Response) => {

    return res.status(200).json({
        msg: 'Index usuarios'
    });
};

// Index de Usuarios
export const showUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    return res.status(200).json({
        msg: 'Show usuarios',
        id: id
    });
};

// Store de Usuarios
export const storeUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    return res.status(200).json({
        msg: 'Store usuarios',
        body: body
    });
};


// Update de Usuarios
export const updateUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    return res.status(200).json({
        msg: 'Update usuarios',
        id: id,
        body: body
    });
};

// Delete de Usuarios
export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    return res.status(200).json({
        msg: 'Delete usuarios',
        id: id
    });
};
