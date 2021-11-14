export const createScheduleSchema = {
    title: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    level_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    },
    subtheme_id: {
        notEmpty: {
            errorMessage: 'Seleccione una opción'
        }
    },
    users_ids: {
        custom: {
            options: async (value) => {
                if (typeof value === 'object'
                    && value
                    && Array.isArray(value)
                    && value.length
                ) {
                    return true;
                }

                throw new Error("Seleccione los usuarios a invitar");
            }
        }
    }
};
