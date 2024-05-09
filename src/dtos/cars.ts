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

export interface CarReqBody {
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