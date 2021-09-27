import {
    Strategy as JwtStrategy,
    ExtractJwt
} from 'passport-jwt'
import { User } from '../models/User'
import { SECRET, FB_CREDS } from './env'
import passport from "passport";
import { Strategy as FBStrategy } from 'passport-facebook';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
    passReqToCallback: true
};

/**
 * Sign in using Email and Password.
 */
passport.use(new JwtStrategy(options, async (req, jwtToken, done) => {
    const user = await User.query().findById(jwtToken.id);

    if (user) {
        req.user = user;

        return done(undefined, user, jwtToken)
    } else {
        return done(undefined, false)
    }
}));

/**
 * Sign in using Facebook
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
passport.use(new FBStrategy({
    clientID: FB_CREDS.ID,
    clientSecret: FB_CREDS.SECRET,
    callbackURL: '/api/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    done(null, {})
}))

export const isAuthorizedMiddleware = async (req, res, next) => {
    await passport.authenticate(['jwt', 'facebook'], (err, user, info) => {
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
