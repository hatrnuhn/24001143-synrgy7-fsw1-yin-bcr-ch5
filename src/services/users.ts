import { RequestHandler } from "express";
import User from "../knex/models/User";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";

export const getUsers: RequestHandler = async (req, res) => {
    const { firstName, lastName } = matchedData(req);
    try {
        const users = await User.query()
            .where({ deletedAt: null });

        if (firstName) users.filter(u => u.firstName.toLowerCase() === firstName);
        if (lastName) users.filter(u => u.lastName.toLowerCase() === lastName);

        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const getUserById: RequestHandler = async (req, res) => {
    const { userId } = matchedData(req);

    try {
        let user = await User.query()
            .where({
                id: userId,
                deletedAt: null
            })
            .first();

        if (!user) res.status(StatusCodes.NOT_FOUND).json({ msg: 'User is not found' })
        else res.status(StatusCodes.OK).json(user);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const addUser: RequestHandler = async (req, res) => {
    const user = matchedData(req);

    try {
        const savedUser = await User.query()
            .insertAndFetch(user);
        
        res.status(StatusCodes.CREATED).json(savedUser);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const patchUser: RequestHandler = async (req, res) => {
    const { userId, ...userPatch } = matchedData(req);

    try {
        const patchedUser = await User.query()
            .patchAndFetchById(userId, userPatch);
            
        res.status(StatusCodes.OK).json(patchedUser);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const deleteUser: RequestHandler = async (req, res) => {
    const { userId } = matchedData(req);

    try {
        await User.query()
            .patchAndFetchById(userId, { deletedAt: new Date() });
    
        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};