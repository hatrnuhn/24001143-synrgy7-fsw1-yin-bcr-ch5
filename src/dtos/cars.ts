export interface AddPatchCarReqBody {
    id?: string,
    plate: string,
    transmission: string,
    manufacture: string,
    model: string,
    description: string,
    rate: string,
    type: string,
    year: number,
    options: string[],
    specs: string[],
    availableAt?: string,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string
};

export interface GetCarsQuery {
    availability?: string,
    manufacture?: string,
    sortByYear?: string,
    transmission?: string,
    year?: string
};