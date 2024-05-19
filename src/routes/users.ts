import { Router } from "express";
import { addUser, deleteUser, getUserById, patchUser } from "../services/users";
import { getUsers } from "../services/users";
import { checkSchema } from "express-validator";
import { addUserBodySchema, patchUserBodySchema, userIdParamSchema } from "../validationSchemas/users";
import validate from '../middlewares/validation/users';

const router = Router();

router.post('/', checkSchema(addUserBodySchema, ['body']), 
    validate.validationResults, 
    addUser);

router.get('/', getUsers);
router.get('/:userId', checkSchema(userIdParamSchema, ['params']), 
    validate.validationResults, 
    getUserById);

router.patch('/:userId', checkSchema(userIdParamSchema, ['params']), 
    validate.validationResults,
    validate.userIdExistence, 
    checkSchema(patchUserBodySchema, ['body']), 
    validate.validationResults, 
    patchUser);

router.delete('/:userId', checkSchema(userIdParamSchema, ['params']), 
    validate.validationResults, 
    validate.userIdExistence, 
    deleteUser);

export default router;