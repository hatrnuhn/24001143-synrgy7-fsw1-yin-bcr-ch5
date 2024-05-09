"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsParamIdSchema = exports.getCarsQuerySchema = exports.addUpdateCarBodySchema = void 0;
exports.addUpdateCarBodySchema = {
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
exports.getCarsQuerySchema = {
    availability: {
        optional: {
            options: {
                checkFalsy: true
            }
        },
        toLowerCase: true,
        isIn: {
            options: [['yes', 'no', 'all']],
            errorMessage: 'Invalid availability query value'
        }
    },
    manufacture: {
        optional: {
            options: {
                checkFalsy: true
            }
        },
        toLowerCase: true,
        isAscii: {
            errorMessage: 'Manufacture chars must be ASCII chars'
        }
    },
    year: {
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isLength: {
            options: {
                min: 4,
                max: 4
            },
            errorMessage: 'sortByYear value must contain 4 characters'
        },
        isNumeric: {
            options: {
                no_symbols: true
            },
            errorMessage: 'Year query must be numeric'
        },
        toInt: true,
        isInt: {
            errorMessage: 'Year query is not an integer'
        }
    },
    transmission: {
        optional: {
            options: {
                checkFalsy: true
            }
        },
        toLowerCase: true,
        isAscii: {
            errorMessage: 'If provided, transmission chars must be ASCII chars'
        },
        isIn: {
            options: [['automatic', 'automanual', 'manual']],
            errorMessage: 'Invalid transmission query value'
        }
    },
    sortByYear: {
        optional: {
            options: {
                checkFalsy: true
            }
        },
        toLowerCase: true,
        isIn: {
            options: [['asc', 'desc']],
            errorMessage: 'Invalid sortByYear query value'
        }
    }
};
exports.carsParamIdSchema = {
    id: {
        notEmpty: {
            errorMessage: 'ID parameter cannot be empty'
        },
        toLowerCase: true,
        isUUID: {
            version: 'all',
            errorMessage: 'Invalid ID parameter: must be an UUID'
        }
    },
};
//# sourceMappingURL=cars.js.map