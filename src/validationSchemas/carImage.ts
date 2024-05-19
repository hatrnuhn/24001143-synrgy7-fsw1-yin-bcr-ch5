export const carImageParamsSchema = {
    carId: {
        notEmpty: {
            errorMessage: 'CarId parameter cannot be empty'
        },
        toLowerCase: true,
        isUUID: {
            version: 'all',
            errorMessage: 'Invalid ID parameter: must be an UUID'
        }
    },
    imageId: {
        optional: {
            options: {
                checkFalsy: true
            }
        },
        notEmpty: {
            errorMessage: 'Id parameter cannot be empty'
        },
        isNumeric: {
            errorMessage: 'Id parameter value can only be an integer'
        },
        toInt: true
    }
}