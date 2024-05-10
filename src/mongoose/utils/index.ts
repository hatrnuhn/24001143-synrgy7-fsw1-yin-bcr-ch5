import mongoose from 'mongoose';
import { Car } from '../../data/cars';

export const saveToDB = async (name: string, payload: any, model: typeof mongoose.Model) => {
    const newEntry = new model(payload);
    try {
        const savedEntry = await newEntry.save();
        return savedEntry;
    } catch (err) {
        throw err;
    }
}

export const getDataFromDB = async (model: typeof mongoose.Model) => {
    try {
        return await model.find();
    } catch (err) {
        throw err;
    }
}

export const cleanCarsFromDB = (carsFromDB: any[]) => {
    const cleanedCars: Car[] = [];

    carsFromDB.forEach(c => {
        const car: Car = {
            id: c.id,
            plate: c.plate,
            transmission: c.transmission,
            manufacture: c.manufacture,
            model: c.model,
            available: c.available,
            type: c.type,
            year: c.year,
            options: c.options,
            specs: c.specs
        }

        cleanedCars.push(car);
    });

    return cleanedCars;
}