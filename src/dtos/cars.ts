export interface Car {
    id: string,
    plate: string,
    transmission: string,
    manufacture: string,
    model: string,
    available: boolean,
    type: string,
    year: number,
    options: string[],
    specs: string[]
}

export interface AddCarReqBody {
    plate: string,
    transmission: string,
    manufacture: string,
    model: string,
    available: boolean,
    type: string,
    year: number,
    options: string[],
    specs: string[]
}

export interface GetCarsQuery {
    availability?: string,
    manufacture?: string,
    sortByYear?: string,
    transmission?: string,
    year?: string
}