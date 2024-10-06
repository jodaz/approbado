export const createAwardSchema = {
    title: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    min_points: {
        notEmpty: {
            errorMessage: 'Ingrese un numero de puntos'
        }
    },
    file: {
        custom: {
            options: async (value, { req }) => {
                if(!req.file) {
                    throw new Error("Enter a file");
                }
            }
        }
    },
    type: {
        notEmpty: {
            errorMessage: 'Seleccione una tipo'
        }
    },
    trivia_id: {
        notEmpty: {
            errorMessage: 'Seleccione una trivia'
        }
    }
};

export const verifyAwardSchema = {
    subtheme_ids: {
        isArray: {
            errorMessage: 'subtheme_ids must be an array of numbers',
        },
        custom: {
            options: (value) => {
                if (value.length === 0) {
                    throw new Error('subtheme_ids must not be empty');
                }
                for (const id of value) {
                    if (typeof id !== 'number') {
                        throw new Error('Each subtheme_id must be a number');
                    }
                }
                return true; // If all checks pass
            },
        },
    },
    level_id: {
        isNumeric: {
            errorMessage: 'level_id must be a number',
        },
        toInt: true, // Convert to integer
    },
    award_id: {
        isNumeric: {
            errorMessage: 'award_id must be a number',
        },
        toInt: true, // Convert to integer
    },
    type: {
        isString: {
            errorMessage: 'type must be a string',
        },
        isIn: {
            options: [['Reto', 'OtroType']], // Replace 'OtroType' with any other valid types
            errorMessage: 'type must be either "Reto" or "OtroType"',
        },
    },
}
