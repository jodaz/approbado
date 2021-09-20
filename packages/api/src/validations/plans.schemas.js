export const createPlanSchema = {
    name: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'El nombre debe tener al menos 5 caracteres'
        }
    },
    amount: {
        notEmpty: {
            errorMessage: 'Ingrese un monto para la membresía'
        }
    }
};