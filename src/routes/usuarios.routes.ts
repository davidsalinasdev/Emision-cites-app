import { Router } from 'express';

// Metodos del Controlador Usuarios
import {
    deleteUsuario,
    indexUsuario,
    showUsuario,
    storeUsuario,
    updateUsuario
} from '../controllers/usuarios.controller';

const router: Router = Router();

// EndPoints Para USUARIOS
router.get('/', indexUsuario);
router.get('/:id', showUsuario);
router.post('/', storeUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;