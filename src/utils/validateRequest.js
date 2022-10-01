import { validationResult } from 'express-validator'

const errorFormatter = ({ msg }) => msg;

export const validateRequest = async (req, res) => {
    const errors = await validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.mapped()
        })
    } else {
        return false;
    }
}
