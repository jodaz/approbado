export const createReportSchema = {
    post_id: {
        notEmpty: {
            errorMessage: 'Seleccione un post'
        }
    },
    reason_id: {
        notEmpty: {
            errorMessage: 'Seleccione una razón'
        }
    }
};

