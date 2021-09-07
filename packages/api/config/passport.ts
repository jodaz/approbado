import { 
    Strategy as JwtStrategy, 
    ExtractJwt, 
    StrategyOptions 
} from 'passport-jwt'
import User from '../models/User'
import { SECRET } from './env'
import passport from "passport";
import { Request, Response, NextFunction } from "express";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

/**
 * Sign in using Email and Password.
 */
passport.use(new JwtStrategy(options, async (jwtToken, done) => {
    const user = await User.query().findById(jwtToken.id);
    if (user) {
        return done(undefined, user, jwtToken)
    } else {
        return done(undefined, false)
    }
}));

export const isAuthorizedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err); 
        }
        if (!user) { 
            return res.json({ error: 'not authenticated' }); 
        }
        next()
    })(req, res, next);
}


export const authMiddleware = passport.initialize();

