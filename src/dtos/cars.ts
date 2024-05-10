export interface AddUpdateCarReqBody {
    plate: string,
    transmission: string,
    manufacture: string,
    model: string,
    available: boolean,
    type: string,
    year: number,
    options: string[],
    specs: string[],
    deleted?: boolean
}

export interface GetCarsQuery {
    availability?: string,
    manufacture?: string,
    sortByYear?: string,
    transmission?: string,
    year?: string
}