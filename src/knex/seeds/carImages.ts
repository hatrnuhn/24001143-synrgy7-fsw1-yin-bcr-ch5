import type { Knex } from "knex";
import Car from "../models/Car";
import Jimp from 'jimp';
import CarImage from "../models/CarImage";
import { Model } from "objection";
import fs from 'fs';
import path from "path";

export const seed = async (knex: Knex): Promise<void> => {
    await knex('car_images').del();

    Model.knex(knex);

    const cars = await Car.query();

    await Promise.all(cars.map(async (c) => {
        const jpeg = new Jimp(4, 4, 0xFFFFFFFF);
        
        // Make sure to call toISOString()
        const filename = `${Date.now()}` + '.jpg';
        
        // Construct the full path
        const dirPath = path.join(__dirname, '../../public/uploads/images/cars', c.id.toString());
        const filePath = path.join(dirPath, filename);

        // Ensure the directory exists
        await fs.promises.mkdir(dirPath, { recursive: true });

        // Write the image file
        await jpeg.writeAsync(filePath);

        // Insert the car image record into the database
        await CarImage.query().insert({
            carId: c.id,
            filename,
        });
    }));
};