export const patchRentalBodySchema = {
    id: {
        optional: {
            options: {
                values: undefined
            }
        },
        isInt: {
            errorMessage: 'ID must be an integer'
        }
    },
    carId: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Car ID must be a string'
        },
        isUUID: {
            errorMessage: 'Car ID must be an UUID'
        }
    },
    userId: {
        optional: {
            options: {
                values: undefined
            }
        },
        isInt: {
            errorMessage: 'User ID must be an integer'
        }
    },
    amount: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Amount must be a string though'
        },
        isNumeric: {
            errorMessage: 'Amount must be numeric'
        }
    },
    startDate: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Start date must be a string'
        },
        isISO8601: {
            errorMessage: 'Start date must be in ISO8601 format'
        }
    },
    endDate: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Start date must be a string'
        },
        isISO8601: {
            errorMessage: 'Start date must be in ISO8601 format'
        }
    }
};

export const postRentalBodySchema = {
    carId: {
        isString: {
            errorMessage: 'Car ID must be a string'
        },
        isUUID: {
            errorMessage: 'Car ID must be an UUID'
        }
    },
    amount: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Amount must be a string though'
        },
        isNumeric: {
            errorMessage: 'Amount must be numeric'
        }
    },
    startDate: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Start date must be a string'
        },
        isISO8601: {
            errorMessage: 'Start date must be in ISO8601 format'
        }
    },
    endDate: {
        isString: {
            errorMessage: 'End date must be a string'
        },
        isISO8601: {
            errorMessage: 'End date must be in ISO8601 format'
        }
    }
};

export const rentalParamsSchema = {
    userId: {
        optional: {
            options: {
                values: undefined
            }
        },
        isNumeric: {
            errorMessage: 'User ID must be numeric'
        },
        toInt: true
    },
    rentalId: {
        optional: {
            options: {
                values: undefined
            }
        },
        isNumeric: {
            errorMessage: 'Rental ID must be numeric'
        },
        toInt: true
    }
};