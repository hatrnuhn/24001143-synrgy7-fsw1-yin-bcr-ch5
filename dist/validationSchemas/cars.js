"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCarBodySchema = void 0;
exports.addCarBodySchema = {
    plate: {
        notEmpty: {
            errorMessage: 'Plate cannot be empty'
        },
        isString: {
            errorMessage: 'Plate must be a string'
        }
    },
    transmission: {
        notEmpty: {
            errorMessage: 'Must explictly imply transmission'
        },
        isString: {
            errorMessage: 'Transmission must be a string'
        }
    },
    manufacture: {
        notEmpty: {
            errorMessage: 'Manufacture cannot be empty'
        },
        isString: {
            errorMessage: 'Manufacture can only be a string'
        }
    },
    model: {
        notEmpty: {
            errorMessage: 'Model cannot be empty'
        },
        isString: {
            errorMessage: 'Model must be a string'
        }
    },
    available: {
        notEmpty: {
            errorMessage: 'Must specify availability'
        },
        isBoolean: {
            errorMessage: 'Availability must be boolean'
        }
    },
    type: {
        notEmpty: {
            errorMessage: 'Type cannot be empty'
        },
        isString: {
            errorMessage: 'Type must be a string'
        }
    },
    year: {
        notEmpty: {
            errorMessage: 'Must specify the year the car is built'
        },
        isInt: {
            errorMessage: 'Year must be integer'
        }
    },
    options: {
        notEmpty: {
            errorMessage: 'Options field must exist. If the car does not have any options, leave an empty array'
        },
        isArray: {
            errorMessage: 'Options must be an array'
        }
    },
    specs: {
        notEmpty: {
            errorMessage: 'Specs field must exist. If the car does not have any specs, leave an empty array'
        },
        isArray: {
            errorMessage: 'Specs must be an array'
        }
    }
};
//# sourceMappingURL=cars.js.map