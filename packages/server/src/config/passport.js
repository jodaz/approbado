import {
    Strategy as JwtStrategy,
    ExtractJwt
} from 'passport-jwt'
import { User } from '../models/User'
import { SECRET } from './env'
import passport from "passport";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
    passReqToCallback: true
};

/**
 * Sign in using Email and Password.
 */
passport.use(new JwtStrategy(options, async (req, jwtToken, done) => {
    const user = await User.query().findById(jwtToken.user);

    if (user) {
        req.user = user;

        return done(undefined, user, jwtToken)
    } else {
        return done(undefined, false)
    }
}));

export const isAuthorizedMiddleware = async (req, res, next) => {
    await passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: 'not authenticated' });
        }
        next()
    })(req, res, next);
}

export const authMiddleware = passport.initialize();
