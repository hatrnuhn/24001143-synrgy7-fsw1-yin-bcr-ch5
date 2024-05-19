export const patchUserBodySchema = {
    id: {
        optional: {
            options: {
                values: undefined
            }
        },
        notEmpty: {
            errorMessage: 'Id cannot be empty'
        },
        isInt: {
            errorMessage: 'Id must be an integer type'
        }
    },
    firstName: {
        optional: {
            options: {
                values: undefined
            }
        },
        notEmpty: {
            errorMessage: 'First name cannot be empty'
        },
        isString: {
            errorMessage: 'First name must be a string'
        }
    },
    lastName: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Last name must be a string'
        } 
    },
    address: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Address must be a string'
        }
    },
    phoneNumber: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Phone number must be a string'
        }
    },
    password: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Password must be a string'
        }
    }
};

export const addUserBodySchema = {
    firstName: {
        notEmpty: {
            errorMessage: 'First name cannot be empty'
        },
        isString: {
            errorMessage: 'First name must be a string'
        }
    },
    lastName: {
        optional: {
            options: {
                values: undefined
            }
        },
        isString: {
            errorMessage: 'Last name must be a string'
        } 
    },
    address: {
        notEmpty: {
            errorMessage: 'Address must not be empty'
        },
        isString: {
            errorMessage: 'Address must be a string'
        }
    },
    phoneNumber: {
        notEmpty: {
            errorMessage: 'Phone number must not be empty'
        },
        isString: {
            errorMessage: 'Phone number must be a string'
        },
        isNumeric: {
            errorMessage: 'Phone number must be numeric'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'Password must not be empty'
        },
        isString: {
            errorMessage: 'Password must be a string'
        },
    }
};

export const userIdParamSchema = {
    userId : {
        isNumeric: {
            errorMessage: 'User ID must be numeric'
        },
        toInt: true
    }
};