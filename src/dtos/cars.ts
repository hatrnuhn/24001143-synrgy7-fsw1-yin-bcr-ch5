export interface AddUpdateCarReqBody {
    plate: string,
    transmission: string,
    manufacture: string,
    model: string,
    availableDate: string,
    description: string,
    rate: string,
    type: string,
    year: number,
    options: string[],
    specs: string[],
    creationTimestamp: string,
    deletionTimestamp?: string
}

export interface GetCarsQuery {
    availability?: string,
    manufacture?: string,
    sortByYear?: string,
    transmission?: string,
    year?: string
}