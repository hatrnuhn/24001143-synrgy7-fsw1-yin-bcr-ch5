//// To populate original cars data, if DB is deleted

// import CarSchema from "./mongoose/schemas/cars";
// import { saveToDB } from "./mongoose/utils";
// import { cars } from './data/cars';

// cars.forEach(c => {
// 	const savedCar = saveToDB('Car', c, CarSchema, 'Cars');
// 	savedCar
// 		.then(v => console.log(`Saved car id ${v.id} ${v.deleted}`))
// 		.catch(err => console.log(err));
// });