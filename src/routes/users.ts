import { Router } from "express";
import { addUser, deleteUser, getUserById, patchUser } from "../services/users";
import { getUsers } from "../services/users";
import { checkSchema } from "express-validator";
import { addUserBodySchema, patchUserBodySchema, userIdParamSchema } from "../validationSchemas/users";
import validate from '../middlewares/validation/users';

const router = Router();

router.post('/', checkSchema(addUserBodySchema, ['body']), validate.addPatchUserBody, addUser);

router.get('/', getUsers);
router.get('/:userId', checkSchema(userIdParamSchema, ['params']), validate.userIdParam, getUserById);

router.patch('/:userId', checkSchema(userIdParamSchema, ['params']), validate.userIdParam, validate.userIdExistence, checkSchema(patchUserBodySchema, ['body']), validate.addPatchUserBody, patchUser);

router.delete('/:userId', checkSchema(userIdParamSchema, ['params']), validate.userIdParam, validate.userIdExistence, deleteUser);

export default router;