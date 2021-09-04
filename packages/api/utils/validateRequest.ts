import { validationResult, ValidationError } from 'express-validator'

const errorFormatter = ({ msg }: ValidationError) => msg;

export const validateRequest = async (req: any, res: any) => {
    const errors = await validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.mapped()
        })
    } else {
        return false;
    }
}