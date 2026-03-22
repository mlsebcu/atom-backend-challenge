import { Router } from 'express';
import { UserRepository } from '../modules/user/user.repository';
import { UserService } from '../modules/user/user.service';
import { UserController } from '../modules/user/user.controller';

const router = Router();

// Instancias
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Rutas user
router.get('/users/:email', userController.findByEmail);
router.post('/users', userController.createUser);

export default router;